import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioModel } from '../../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioData$: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth) {
    this.usuarioData$ = this.auth.authState;
  }

  login(usuario: UsuarioModel) {
    const {email, password} = usuario;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

}
