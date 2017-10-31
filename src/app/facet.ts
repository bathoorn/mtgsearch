import { FacetValue } from './facet-value';

export class Facet {
    name: string = '';
    values: FacetValue[] = [];
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
