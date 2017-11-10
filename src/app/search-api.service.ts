import { Injectable, SimpleChange } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, PageEvent } from '@angular/material';
import { CardData } from './card-data';
import { CardDataSource } from './card-data-source';
import { FacetData } from './facet-data';
import { FacetDataSource } from './facet-data-source';
import { FacetUpdate } from './facet/facet.component';
import { ActiveFacets } from './active-facets';

const API_URL = environment.searchUrl;

@Injectable()
export class SearchApiService {
  dataLoaded: Promise<boolean>;
  searchContext: SearchContext;
  cards: CardData[];
  facets: FacetData[];
  pivots: ChartData[];
  manachart: ChartData; 
  colorchart: ChartData;
  cardSource: CardDataSource | null;
  facetSource: FacetDataSource | null;
  length: number;
  colors:any = {
    White: "#FFFFFF",
    Green: "#00FF00",
    Black: "#000000",
    Red: "#FF0000",
    Blue: "#0000FF"
  };
  monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  
  constructor(private http: Http) {
  }

  setSearchContext(context: SearchContext) {
    this.searchContext = context;
  }
  
  searchSolr() {
    var facets: string[] = this.searchContext.active_facets.facetParameter();
    facets.push('releasedate:[* TO NOW]');
    var res: Observable<Response>;
    res = this.http.request(API_URL,
      {
      method: 'GET',
      params: {
          'q': (this.searchContext.query.length == 0)?'*':this.searchContext.query, 
          'wt': 'json',
          'rows': this.searchContext.page_size,
          'start': this.searchContext.page_index*this.searchContext.page_size,
          'indent':true,
          'facet':'true',
          'facet.field' : ['colors_exact','supertypes_exact','types_exact','subtypes_exact','cmc_exact','rarities_exact','layouts_exact','legalities_exact','sets_exact','artists_exact'],
          'facet.pivot' : 'types_exact,cmc_exact',
          'fq' : facets,
          'sort' : this.searchContext.sort_field+'+'+this.searchContext.sort_direction,
          'NOW': this.searchContext.now
        }}
    );
    res.subscribe(
      (res2) => {
        var resjson = res2.json();
        this.loadfacets(resjson.facet_counts.facet_fields);
        this.loadcards(resjson.response.docs);
        this.manachart = this.getChartData('cmc_exact');
        this.colorchart = this.getChartData('colors_exact');
        this.loadpivots(resjson.facet_counts.facet_pivot);
        this.length = resjson.response.numFound;
        this.dataLoaded = Promise.resolve(true);
      });
  }

  loadfacets(afacetslist) {
    this.facets = [];
    for (const key of Object.keys(afacetslist)) {
      var thefacetname = key;
      var thefacetlabel = key.slice(0,-6);
      var thefacetvalues = afacetslist[key];
      var thefacetvaluelabels = []
      var thefacetcounts = {};
      var thefacetchecked = {};        
      var i = 0;
      for (i = 0; i < thefacetvalues.length; i=i+2) {
        if (thefacetvalues[i+1]>0) {
          thefacetvaluelabels.push(thefacetvalues[i]+" ("+thefacetvalues[i+1]+")");           
          thefacetcounts[thefacetvalues[i]]=thefacetvalues[i+1];
          thefacetchecked[thefacetvalues[i]]=this.searchContext.active_facets.checkFacet(thefacetname,thefacetvalues[i]);            
        }
      }
      thefacetvalues = Object.keys(thefacetcounts);
      this.facets.push({
        name: thefacetname,
        label: thefacetlabel,
        values: thefacetvalues,
        value_labels: thefacetvaluelabels,
        counts: thefacetcounts,
        checked: thefacetchecked
      });
    }
    this.facetSource = new FacetDataSource(this.facets);           
  }

  loadcards(acardlist) {
    this.cards = [];
    for (const card of Object.keys(acardlist)) {
      this.cards.push({
          multiverseId: ((acardlist[card].multiverseids)?acardlist[card].multiverseids.slice(0,1):""),
          name: acardlist[card].name,
          manaCost: acardlist[card].manacost,
          type: acardlist[card].type,
          color: ((acardlist[card].colors)?acardlist[card].colors.slice(0,1):""),
          rarity: ((acardlist[card].rarities)?acardlist[card].rarities.slice(0,1):""),
          layout: ((acardlist[card].layouts)?acardlist[card].layouts.slice(0,1):"plain"),
          text: ((acardlist[card].cardtext)?acardlist[card].cardtext:""),
          rulings: ((acardlist[card].rulings)?acardlist[card].rulings:[]),
          foreignnames: ((acardlist[card].foreignnames)?acardlist[card].foreignnames:[]),
          releasedate: ((acardlist[card].releasedate)?this.showDate(acardlist[card].releasedate):"")
      });
    }
    this.cardSource = new CardDataSource(this.cards);            
  }

  loadpivots(apivotlist) {
    this.pivots = [];
    var labels = this.manachart.labels;
    for (const pivot of Object.keys(apivotlist)) {
      var data = []
      for (var i in apivotlist[pivot]) {
        var series_label = apivotlist[pivot][i].value;
        var series_data = [];
        for (var j in apivotlist[pivot][i].pivot) {
           series_data.push(apivotlist[pivot][i].pivot[j].count);
        }
        data.push({data: series_data, label: series_label});
      }
      this.pivots.push({
        data: data,
        labels: labels,
        options: {
          scaleShowVerticalLines: false,
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true
            }]
          },
          tooltips: {
            mode: 'label'
          }
        },
        colors: [],
        legend: false
      });
    }
  }

  getChartData(facetname: string):ChartData {
    var i = 0;
    var data = [];
    var labels = [];
    var sortedcolors = [];
    this.facets.forEach(facet => {
      if (facet.name == facetname) {
        if (facetname == 'cmc_exact') {          
          for (i = 0; i < facet.values.length; i++) {
            labels.push(parseInt(facet.values[i]));
          }
          labels = labels.sort(function (a,b) {
            return a - b;
          });
        } else {
          labels = facet.values
        }
        for (i = 0; i < labels.length; i++) {
          data.push(facet.counts[labels[i]])
          if (facetname == 'colors_exact') {            
            sortedcolors.push(this.colors[labels[i]]);
          }
        }    
      }
    });
    return {data: [{data: data, label: 'all'}],
           labels: labels,
           options: {
                        scaleShowVerticalLines: false,
                        responsive: true
                    },
           colors: [{ backgroundColor: sortedcolors }],
           legend: false
    };
  }

  showDate(adate: string){
    var date = new Date(adate);
    return this.monthNames[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
  }

  getCards():CardData[] {
    return this.cards;
  }

  getFacets():FacetData[] {
    return this.facets;
  }

  filterDate(event) {
    if (event) {
      this.searchContext.now = new Date(event.value).getTime();
    }
    this.searchSolr();
  }

  changePagination(event?:PageEvent) {
    if (event) {
      this.searchContext.page_size = event.pageSize;
      this.searchContext.page_index = event.pageIndex;
    }
    this.searchSolr();
  }

  changeSort(asort) {
    if (this.searchContext.sort_field == asort) {
      if (this.searchContext.sort_direction == 'asc') {
        this.searchContext.sort_direction = 'desc';
      } else {
        this.searchContext.sort_direction = 'asc';         
      }
    } else {
      this.searchContext.sort_field = asort;
      this.searchContext.sort_direction = 'asc';
    }
    this.searchSolr();
  }

  isSort(field: string,direction: string):boolean {
    return this.searchContext.sort_field == field && this.searchContext.sort_direction == direction;      
  }

  toggleFacet(event: FacetUpdate) {
    this.searchContext.active_facets.toggleFacet(event);
    this.searchSolr();
  }
}

export interface SearchContext {
  query: string,
  active_facets: ActiveFacets,
  sort_field: string,
  sort_direction: string,
  page_size: number,
  page_index: number,
  now: number
}

export interface ChartData {
  data: any[],
  labels: string[],
  options: any,
  colors: any,
  legend: boolean
}