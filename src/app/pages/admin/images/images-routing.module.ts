import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageComponent } from './image/image.component';
import { ImagesComponent } from './images/images.component';


const routes: Routes = [
  {
    path: '',
    component: ImagesComponent,
    children: [
      {path: '', component: ImagesListComponent},
      {path: 'addImage', component: ImageComponent},
      {path: ':idImage', component: ImageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
