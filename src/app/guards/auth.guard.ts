import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/admin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): Observable<boolean> {
    return this.authService.usuarioData$.pipe(
      map(user => {
        if (!user){
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      }));
 }

}
