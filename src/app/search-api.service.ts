import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const API_URL = environment.searchUrl;

@Injectable()
export class SearchApiService {

  constructor(private http: Http) {
  }
  
  searchSolr(): Observable<Response> {
    return this.http.request(API_URL,
      {
      method: 'GET',
      params: {
          'q': 'goblins', 
          'wt': 'json',
          'rows': 25,
          'indent':true,
          'facet':'true',
          'facet.field' : 'colors'
      }}
    );
  }
}
