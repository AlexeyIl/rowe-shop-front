import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../shared.module';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { ProductBadgeComponent } from '../../components/product-badge/product-badge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from '../../components/product-page/product-page.component';

@NgModule({
  declarations: [ProductBadgeComponent, ProductPageComponent, CatalogComponent],
  imports: [CatalogRoutingModule, SharedModule, ReactiveFormsModule],
  bootstrap: [CatalogComponent],
})
export class CatalogModule {}
