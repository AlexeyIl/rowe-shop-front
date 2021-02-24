import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private meta: Meta) {}

  addMetaProductPage(item: ProductModel) {
    this.meta.addTags([
      {
        name: 'title',
        content: `${item.name} ${item.pack}л по низкой цене в Москве`,
      },
      {
        name: 'keywords',
        content: `${item.code} ${item.name} ${item.code.replace(
          /-/g,
          ''
        )} ${item.code.slice(0, 5)}`,
      },
      { name: 'author', content: 'rowe' },
      {
        name: 'discription',
        content: `Купить оригинальный ROWE ${item.name} ${item.pack}л по цене ${item.price} ₽ в Москве`,
      },
      { name: 'generator', content: 'ROWE' },
    ]);
  }
}
