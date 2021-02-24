import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { ProductPageComponent } from '../../components/product-page/product-page.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    pathMatch: 'full',
  },
  {
    path: ':code',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
