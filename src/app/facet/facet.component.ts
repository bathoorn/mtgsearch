import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FacetData} from '../facet-data';
import {FacetDataSource} from '../facet-data-source';

@Component({
  selector: 'mtg-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css']
})
export class FacetComponent implements OnInit {
  @Input() dataSource:FacetDataSource;

  @Output('update')
  update: EventEmitter<FacetUpdate> = new EventEmitter<FacetUpdate>();

  constructor() { }

  ngOnInit() {
  }

  toggleFacet(name,value) {
    var event = new FacetUpdate(name,value);
    this.update.emit(event);
  }

  isChecked(facet: FacetData,value: string) {
    var ret = "check_box_outline_blank";
    if (facet.checked[value.split(' (')[0]]) {
      ret = "check_box";
    }
    return ret;
  }

}

export class FacetUpdate {

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }  
  
  name: string;
  value: string;
}
