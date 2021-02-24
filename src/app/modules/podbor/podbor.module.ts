import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodborComponent } from '../../components/podbor/podbor.component';
import { PodborRoutingModule } from './podbor-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [PodborComponent],
  imports: [CommonModule, PodborRoutingModule, SharedModule],
  bootstrap: [PodborComponent],
})
export class PodborModule {}
