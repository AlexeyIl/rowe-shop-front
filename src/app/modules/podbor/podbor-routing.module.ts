import { Routes, RouterModule } from '@angular/router';
import { PodborComponent } from '../../components/podbor/podbor.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PodborComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodborRoutingModule {}
