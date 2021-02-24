import { ProductModel } from './product.model';
export class FilterCatalogModel {
  ABC?: number;
  code?: string;
  pack?: number[] = null;
  category?: string[];
  group?: string;
  name?: string;
  sae?: string[] = null;
  sortPoll?: string;
  descending?: boolean;

  constructor(vl: FilterCatalogModel) {
    this.ABC = vl.ABC;
    this.code = vl.code;
    if (vl.pack && vl.pack[0] !== 0) {
      this.pack = vl.pack;
    };
    if (vl.category && vl.category[0] !== '') {
      this.category = vl.category;
    };
    this.group = vl.group;
    this.name = vl.name;
    if (vl.sae && vl.sae[0] !== '') {
      this.sae = vl.sae;
    };
    this.sortPoll = vl.sortPoll;
    this.descending = vl.descending;
  }
}
