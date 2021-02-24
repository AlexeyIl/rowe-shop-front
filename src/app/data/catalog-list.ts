export const catalogList: CatalogListItemInterface[] = [
    {name: 'Авто', link: 'auto'},
    {name: 'Коммерческий', link: 'commercial'},
    {name: 'Трансмиссия', link: 'transmission'},
    {name: 'Мото', link: 'moto'},
    {name: 'С/х и строительные машины', link: 'agriculture'},
    {name: 'Антифризы', link: 'antifreeze'},
    {name: 'Консистентные смазки', link: 'grease'},
    {name: 'Тормозные жидкости', link: 'brake'},
    {name: 'Индустриальные', link: 'industrial'},
    {name: 'Лодочные', link: 'marine'}
  ]
  

  export interface CatalogListItemInterface {
    name: string,
    link: string
  }