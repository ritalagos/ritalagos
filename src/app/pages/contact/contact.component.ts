import { Component, OnInit } from '@angular/core';
import { SocialPaginaService } from '../../services/social-pagina.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public socialPagina: SocialPaginaService) {
  }

  ngOnInit(): void {
  }

}
