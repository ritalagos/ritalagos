import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ocultarCancelar = false;

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
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

  pressCancel(){
    this.ocultarCancelar = false;
    this.location.back();
  }
}
