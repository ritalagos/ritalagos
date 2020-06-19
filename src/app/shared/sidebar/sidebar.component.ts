import { Component, OnInit } from '@angular/core';
import { SocialPaginaService } from '../../services/social-pagina.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public socialPagina: SocialPaginaService) { }

  ngOnInit(): void {
  }

}
