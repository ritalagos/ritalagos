import { Component, OnInit } from '@angular/core';
import { SocialPaginaService } from '../../../../services/social-pagina.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  fecha = new Date().getFullYear();

  acercaDe = 'Rita Lagos es un profesional idependiente que vive en la ciudad de Lima. Realiza ilustración, diseño y animación. Su especialidad es el diseño.';
  infoPagina = 'Si tiene alguna pregunta sobre mis servicios, o simplemente quiere saludarme, no dude en ponerse en contacto conmigo. A continuación estan mis páginas sociales y mi correo electrónico.';

  constructor(public socialPagina: SocialPaginaService) {
  }

  ngOnInit(): void {
  }

}
