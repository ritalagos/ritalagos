import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutInteface } from '../interfaces/about.interface';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  about: AboutInteface[];

  constructor(private http: HttpClient) {
    this.cargaAbout();
   }

  private cargaAbout(){
    return new Promise((resolve , reject) => {
      this.http.get('assets/data/about.json').subscribe((resp: AboutInteface[]) => {
        this.about = resp;
        console.log(this.about);
        resolve();
      });
    });
  }
}
