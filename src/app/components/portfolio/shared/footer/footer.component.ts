import { Component, OnInit } from '@angular/core';
import { SocialPaginaService } from '../../../../services/social-pagina.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  fecha = new Date().getFullYear();

  acercaDe = 'Rita Lagos es un profesional idependiente que vive en la ciudad de Lima. Realiza ilustración, diseño y animación. Su pasión es el diseño.';
  infoPagina = 'Mi redes sociales y mi correo electrónico: rita1999lagos@gmail.com para más información.';

  constructor(public socialPagina: SocialPaginaService) {
  }

  ngOnInit(): void {
  }

}
