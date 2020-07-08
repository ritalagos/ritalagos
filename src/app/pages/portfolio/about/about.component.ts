import { Component, OnInit } from '@angular/core';
import { SocialPaginaService } from '../../../services/social-pagina.service';
import { AboutService } from '../../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public socialPagina: SocialPaginaService, public abouts: AboutService) { }

  ngOnInit(): void {
  }

}
