import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FacetData} from './facet-data';

export class FacetDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    constructor(private _data: FacetData[]) {
      super();
    }
  
    connect(): Observable<FacetData[]> {
      return Observable.of(this._data);
    }
  
    disconnect() {}
  }
