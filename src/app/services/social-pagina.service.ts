import { Injectable } from '@angular/core';
import { SocialPagina } from '../interfaces/social-pagina.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialPaginaService {

  social: SocialPagina = {};
  cargando = false;

  constructor(private http: HttpClient) {
    this.cargarSocial();
  }

  private cargarSocial(){
    this.http.get('assets/data/social-pagina.json')
    .subscribe((resp: SocialPagina) => {
      this.cargando = true;
      this.social = resp;
    });
  }
}
