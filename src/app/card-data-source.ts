import {DataSource} from '@angular/cdk/table';
import {MatPaginator, PageEvent} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CardData} from './card-data';

export class CardDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    constructor(private _data: CardData[]) {
      super();
    }
  
    connect(): Observable<CardData[]> {
      return Observable.of(this._data);
    }
  
    disconnect() {}
  }
