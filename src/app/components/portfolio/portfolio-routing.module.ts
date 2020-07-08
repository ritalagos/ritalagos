import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortafolioComponent } from '../../pages/portfolio/portafolio/portafolio.component';
import { AboutComponent } from '../../pages/portfolio/about/about.component';
import { ItemsComponent } from '../../pages/portfolio/items/items.component';
import { SearchComponent } from '../../pages/portfolio/search/search.component';
import { ContactComponent } from '../../pages/portfolio/contact/contact.component';

const routes: Routes = [
  { path: 'home', component: PortafolioComponent},
  { path: 'about', component: AboutComponent},
  { path: 'photos', component: ItemsComponent},
  { path: 'search/:termino', component: SearchComponent},
  { path: 'contact', component: ContactComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
