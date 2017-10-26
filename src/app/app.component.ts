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
  results: Response = undefined;

    constructor(
      private searchApiService: SearchApiService
    ) {
    }
  
    public ngOnInit() {
      this.searchApiService
        .searchSolr()
        .subscribe(
          (res) => {
            this.results = res;
          }
        );
    }
}
