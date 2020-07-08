import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PortafolioComponent } from '../../pages/portfolio/portafolio/portafolio.component';
import { AboutComponent } from '../../pages/portfolio/about/about.component';
import { ItemsComponent } from '../../pages/portfolio/items/items.component';
import { ContactComponent } from '../../pages/portfolio/contact/contact.component';
import { SearchComponent } from '../../pages/portfolio/search/search.component';
import { LoaderComponent } from '../../pages/portfolio/loader/loader.component';


@NgModule({
  declarations: [
    PortfolioComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    PortafolioComponent,
    AboutComponent,
    ItemsComponent,
    ContactComponent,
    SearchComponent,
    LoaderComponent,
    // LoginComponent,
    // RegistroComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class PortfolioModule { }
