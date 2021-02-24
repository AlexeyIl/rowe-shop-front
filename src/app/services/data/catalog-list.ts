export const catalogList: CatalogListItemInterface[] = [
  { name: 'Авто', link: 'auto', svg: 'auto' },
  { name: 'Коммерческий', link: 'commercial', svg: 'commercial' },
  { name: 'Трансмиссия', link: 'transmission', svg: 'transmission' },
  { name: 'Мото', link: 'moto', svg: 'moto' },
  { name: 'С/х и строительные машины', link: 'agriculture', svg: 'agriculture' },
  { name: 'Антифризы', link: 'antifreeze', svg: 'antifreeze' },
  { name: 'Консистентные смазки', link: 'grease', svg: 'grease' },
  { name: 'Тормозные жидкости', link: 'brake', svg: 'brake' },
  { name: 'Индустриальные', link: 'industrial', svg: 'industrial' },
  { name: 'Лодочные', link: 'marine', svg: 'marine' },
];

export interface CatalogListItemInterface {
  name: string;
  link: string;
  svg: string;
}
