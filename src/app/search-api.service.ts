import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';

const API_URL = environment.searchUrl;

@Injectable()
export class SearchApiService {
  results = undefined;

  constructor(private http: Http) {
  }
  
  searchSolr(): JSON {
    this.http.request(API_URL,{
      method: 'JSONP',
      params: {
          'json.wrf': 'JSON_CALLBACK',
          'q': 'goblins', 
          'wt': 'json',
          'rows': 25,
          'indent':true,
          'facet':'true',
          'facet.field' : 'colors'
      }}
    ).subscribe(res => this.results = res.json());
    return this.results;
  }
}
