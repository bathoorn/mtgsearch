export class FacetValue {
    value: string = '';
    count: number = 0;
    
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
