export class SelectedFacet {
    name: string = '';
    value: string = '';
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
