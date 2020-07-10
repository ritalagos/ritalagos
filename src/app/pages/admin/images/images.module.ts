import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { ImagesListComponent } from './images-list/images-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ImagesListComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class ImagesModule { }
