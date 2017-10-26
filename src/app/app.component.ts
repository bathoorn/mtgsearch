import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';
import { Http, Response } from '@angular/http';
import { Facet } from './facet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchApiService]
})
export class AppComponent {
  title = 'mtgsearch';
  facets: Facet[] = [];
  query: string = 'goblins';
  results: JSON = undefined;

    constructor(
      private searchApiService: SearchApiService
    ) {
    }
  
    public ngOnInit() {
      this.searchApiService
        .searchSolr(this.query)
        .subscribe(
          (res) => {
            this.results = res.json();
          }
        );
    }

    search() {
      this.searchApiService
        .searchSolr(this.query)
        .subscribe(
        (res) => {
          this.results = res.json();
        }
      );
    }
    
    convertSymbols(item){
      item = item.replace(/\{W\}/g,'<i class="ms ms-w ms-cost"></i>');
      item = item.replace(/\{U\}/g,'<i class="ms ms-u ms-cost"></i>');
      item = item.replace(/\{B\}/g,'<i class="ms ms-b ms-cost"></i>');
      item = item.replace(/\{G\}/g,'<i class="ms ms-g ms-cost"></i>');
      item = item.replace(/\{R\}/g,'<i class="ms ms-r ms-cost"></i>');
      item = item.replace(/\{W\/U\}/g,'<i class="ms ms-wu ms-split ms-cost"></i>');
      item = item.replace(/\{W\/B\}/g,'<i class="ms ms-wb ms-split ms-cost"></i>');
      item = item.replace(/\{2\/W\}/g,'<i class="ms ms-2w ms-split ms-cost"></i>');
      item = item.replace(/\{U\/B\}/g,'<i class="ms ms-ub ms-split ms-cost"></i>');
      item = item.replace(/\{U\/R\}/g,'<i class="ms ms-ur ms-split ms-cost"></i>');
      item = item.replace(/\{2\/U\}/g,'<i class="ms ms-2u ms-split ms-cost"></i>');
      item = item.replace(/\{B\/R\}/g,'<i class="ms ms-br ms-split ms-cost"></i>');
      item = item.replace(/\{B\/G\}/g,'<i class="ms ms-bg ms-split ms-cost"></i>');
      item = item.replace(/\{2\/B\}/g,'<i class="ms ms-2b ms-split ms-cost"></i>');
      item = item.replace(/\{R\/G\}/g,'<i class="ms ms-rg ms-split ms-cost"></i>');
      item = item.replace(/\{R\/W\}/g,'<i class="ms ms-rw ms-split ms-cost"></i>');
      item = item.replace(/\{2\/R\}/g,'<i class="ms ms-2r ms-split ms-cost"></i>');
      item = item.replace(/\{G\/W\}/g,'<i class="ms ms-gw ms-split ms-cost"></i>');
      item = item.replace(/\{G\/U\}/g,'<i class="ms ms-gu ms-split ms-cost"></i>');
      item = item.replace(/\{2\/G\}/g,'<i class="ms ms-2g ms-split ms-cost"></i>');
      item = item.replace(/\{C\}/g,'<i class="ms ms-c ms-cost"></i>');
      item = item.replace(/\{P\}/g,'<i class="ms ms-p ms-cost"></i>');
      item = item.replace(/\{S\}/g,'<i class="ms ms-s ms-cost"></i>');
      item = item.replace(/\{X\}/g,'<i class="ms ms-x ms-cost"></i>');
      item = item.replace(/\{Y\}/g,'<i class="ms ms-y ms-cost"></i>');
      item = item.replace(/\{Z\}/g,'<i class="ms ms-z ms-cost"></i>');
      item = item.replace(/\{0\}/g,'<i class="ms ms-0 ms-cost"></i>');
      item = item.replace(/\{1\}/g,'<i class="ms ms-1 ms-cost"></i>');
      item = item.replace(/\{2\}/g,'<i class="ms ms-2 ms-cost"></i>');
      item = item.replace(/\{3\}/g,'<i class="ms ms-3 ms-cost"></i>');
      item = item.replace(/\{4\}/g,'<i class="ms ms-4 ms-cost"></i>');
      item = item.replace(/\{5\}/g,'<i class="ms ms-5 ms-cost"></i>');
      item = item.replace(/\{6\}/g,'<i class="ms ms-6 ms-cost"></i>');
      item = item.replace(/\{7\}/g,'<i class="ms ms-7 ms-cost"></i>');
      item = item.replace(/\{8\}/g,'<i class="ms ms-8 ms-cost"></i>');
      item = item.replace(/\{9\}/g,'<i class="ms ms-9 ms-cost"></i>');
      item = item.replace(/\{10\}/g,'<i class="ms ms-10 ms-cost"></i>');
      item = item.replace(/\{11\}/g,'<i class="ms ms-11 ms-cost"></i>');
      item = item.replace(/\{12\}/g,'<i class="ms ms-12 ms-cost"></i>');
      item = item.replace(/\{13\}/g,'<i class="ms ms-13 ms-cost"></i>');
      item = item.replace(/\{14\}/g,'<i class="ms ms-14 ms-cost"></i>');
      item = item.replace(/\{15\}/g,'<i class="ms ms-15 ms-cost"></i>');
      item = item.replace(/\{16\}/g,'<i class="ms ms-16 ms-cost"></i>');
      item = item.replace(/\{17\}/g,'<i class="ms ms-17 ms-cost"></i>');
      item = item.replace(/\{18\}/g,'<i class="ms ms-18 ms-cost"></i>');
      item = item.replace(/\{19\}/g,'<i class="ms ms-19 ms-cost"></i>');
      item = item.replace(/\{20\}/g,'<i class="ms ms-20 ms-cost"></i>');
      item = item.replace(/\{100\}/g,'<i class="ms ms-100 ms-cost"></i>');
      item = item.replace(/\{1000000\}/g,'<i class="ms ms-1000000 ms-cost"></i>');
      item = item.replace(/\{T\}/g,'<i class="ms ms-tap"></i>');
      item = item.replace(/\{Q\}/g,'<i class="ms ms-untap"></i>');
      item = item.replace(/\+(\d+)\:/g,'<i class="ms ms-loyalty-up  ms-loyalty-$1"></i>:');
      item = item.replace(/\-(\d+)\:/g,'<i class="ms ms-loyalty-down  ms-loyalty-$1"></i>:');
      item = item.replace(/0:/g,'<i class="ms ms-loyalty-zero ms-loyalty-0"></i>:');
      return item;
    }
}
