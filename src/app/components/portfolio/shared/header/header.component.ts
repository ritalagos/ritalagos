import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from '../../../../services/admin/auth.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ocultarCancelar = false;
  login = false;

  constructor(private router: Router, private location: Location, public authService: AuthService ) { }

  ngOnInit(): void {
    this.validateLogin();
  }

  menuToggle(){
    $('#wrapper').toggleClass('toggled');
  }

  buscarPhotos(termino: string){
    if (termino.length < 1){
      return;
    }
    this.ocultarCancelar = true;
    this.router.navigate(['/search', termino]);
  }

  private validateLogin(){
    this.authService.usuarioData$.subscribe(data => {
      if (data){
        this.login = true;
      }else{
        this.login = false;
      }
    });
  }

  pressCancel(){
    this.ocultarCancelar = false;
    this.location.back();
  }
}
