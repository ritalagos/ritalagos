import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesRoutingModule } from './images-routing.module';
import { ImagesListComponent } from './images-list/images-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageComponent } from './image/image.component';
import { ImagesComponent } from './images/images.component';

@NgModule({
  declarations: [ImagesListComponent, ImageComponent, ImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ImagesModule { }
