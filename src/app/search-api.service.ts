import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';

const API_URL = environment.searchUrl;

@Injectable()
export class SearchApiService {

  constructor(
    private http: Http
  ) {
  }
}
