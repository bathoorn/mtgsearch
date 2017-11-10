import { FacetUpdate } from './facet/facet.component';

export class ActiveFacets {
  active_facets = {}

  // { colors_exact: { Red: true, Black: false }, sets_exact: { Mirrodin: true } }
  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toggleFacet(event: FacetUpdate) {
    // toggleFacet('colors_exact','Red') toggles facet with name = colors_exact and value = Red from true => false or vice versa
    // this toggles the checkbox in the user interface
    var name = event.name;
    var value = event.value;
    if (this.active_facets[name]) {
      if (this.active_facets[name][value]) {
        this.active_facets[name][value] = false;
      } else {
        this.active_facets[name][value] = true;
      }         
    } else {
      this.active_facets[name]={};
      this.active_facets[name][value] = true;
    }
  }


  checkFacet(name,value){
    // checkFacet('colors_exact','Red') checks if facet with name = colors_exact and value = Red is set to true
    // this means the checkbox for the facet is checked
    var ret = false;
    if (this.active_facets[name]){
      if (this.active_facets[name][value]){
        ret = this.active_facets[name][value];
      }
    }
    return ret;
  }

  facetParameter(): string[] {
    var facets: string[] = [];
    Object.keys(this.active_facets).forEach((name) => { 
      Object.keys(this.active_facets[name]).forEach((value) => {
        if (this.active_facets[name][value]) {
          facets.push(name+":\""+value+"\"")
        }     
      });
    });
    return facets;
  }
}
