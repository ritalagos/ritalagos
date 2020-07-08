import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fecha = new Date().getFullYear();
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  private crearFormulario(){
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
  }

  login(){
    if (this.formulario.invalid){
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const usuario = this.formulario.value;
    this.authService.logIn(usuario).subscribe(resp => {
      this.router.navigateByUrl('/admin');

      this.formulario.reset({
        nombre: '',
        password: ''
      });
    }, (err) => {
      if (err) {
        this.router.navigateByUrl('/login');
      }
    });
  }


}
