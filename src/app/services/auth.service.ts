import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  private apiKey = 'AIzaSyA0hx-1GmtnBZWtz51tsZlXk0afC5KQH5A';

  usuarioToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }

  logIn(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken : true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`, authData
      ).pipe(map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      }));
  }

  registrarUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken : true
    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData);
  }

  private guardarToken(idToken: string){
    this.usuarioToken = idToken;
    localStorage.setItem('token', idToken);

    const limite = new Date();
    limite.setSeconds(3600);
    localStorage.setItem('expira', limite.getTime().toString());
  }

  private leerToken(){
    if (localStorage.getItem('token')){
      this.usuarioToken = localStorage.getItem('token');
    }else{
      this.usuarioToken = '';
    }
    return this.usuarioToken;
  }

  usuarioAutenticado(): boolean{
    if (this.usuarioToken.length < 2){
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraTime = new Date();
    expiraTime.setTime(expira);

    if (expiraTime > new Date()){
      return true;
    }else{
      return false;
    }
  }

}
