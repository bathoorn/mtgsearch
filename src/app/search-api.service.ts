import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SelectedFacet } from './selected-facet';

const API_URL = environment.searchUrl;

@Injectable()
export class SearchApiService {

  constructor(private http: Http) {
  }
  
  searchSolr(aquery: string, afacetlist: object): Observable<Response> {
    var facets = [];
    Object.keys(afacetlist).forEach((name) => { 
      Object.keys(afacetlist[name]).forEach((value) => {
        if (afacetlist[name][value]) {
          facets.push(name+":"+value)
        }     
      });
    });
    return this.http.request(API_URL,
      {
      method: 'GET',
      params: {
          'q': aquery, 
          'wt': 'json',
          'rows': 25,
          'indent':true,
          'facet':'true',
          'facet.field' : ['colors_exact','supertypes_exact','types_exact','subtypes_exact','cmc_exact','rarities_exact','layouts_exact','legalities_exact','sets_exact','artists_exact'],
          'fq' : facets
        }}
    );
  }
}
