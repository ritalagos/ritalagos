import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/admin/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  usuario: UsuarioModel;
  registro = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.creaFormulario();
  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  creaFormulario(){
    this.formulario = this.formBuilder.group({
      nombre : ['', [Validators.required , Validators.minLength(5)]],
      email : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password : ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$')]]
    });
  }

  get nombreNoValido(){
    return this.validarCampos('nombre');
  }

  get emailNoValido(){
    return this.validarCampos('email');
  }

  get passwordNoValido(){
    return this.validarCampos('password');
  }

  private validarCampos(nombreCampo: string){
    return this.formulario.get(nombreCampo).invalid && this.formulario.get(nombreCampo).touched;
  }

  registrar(){
    /*
    if (this.formulario.invalid){
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const usuario: UsuarioModel = this.formulario.value;
    console.log(usuario);
    this.authService.registrarUsuario(usuario).subscribe(() => {
      this.router.navigateByUrl('/login');
      this.formulario.reset({
        nombre: '',
        email: '',
        password: ''
      });
    }, (err) => {
      if (err){
        this.registro = true;
        setTimeout(() => {
          this.registro = false;
        }, 4000);
      }
    });*/
  }


}
