import { Component, OnInit } from '@angular/core';
import { CategoriaService, CategorieI } from '../../../../services/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SweetAlertService } from '../../../../services/sweet-alert.service';

declare var Swal: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  formulario: FormGroup;
  public categories: CategorieI[];
  private idCategorie: string;
  public cargaCompleted = true;
  private sweetAlert: SweetAlertService = new SweetAlertService();


  constructor(private fb: FormBuilder, private categorieService: CategoriaService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.allCategories();
  }
  private crearFormulario(){
    this.formulario = this.fb.group({
      cod: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  get codigoNoValido(){
    return this.validarCampos('cod');
  }
  get descripcionNoValido(){
    return this.validarCampos('descripcion');
  }

  private validarCampos(nombreCampo: string){
    return this.formulario.get(nombreCampo).invalid && this.formulario.get(nombreCampo).touched;
  }

  private cargarFormulario(categorie: CategorieI){
    this.formulario.setValue({
      cod: categorie.cod,
      descripcion: categorie.descripcion
    });
    this.idCategorie = categorie.key;
  }

  private limpiarFormulario(){
    this.formulario.reset({
      cod: '',
      descripcion: '',
    });
    this.idCategorie = null;
  }

  private allCategories(){
    this.cargaCompleted = false;
    this.categorieService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.cargaCompleted = true;
    });
  }

  public addCategorie(){
    if (this.formulario.invalid){
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.sweetAlert.dialogAlertWait();
    let peticion: Promise<any>;

    const categorie: CategorieI = this.formulario.value;
    if (this.idCategorie) {
      peticion = this.categorieService.updateCategorie(this.idCategorie, categorie);
    }else{
      peticion = this.categorieService.addCategorie(categorie);
    }
    this.showDialog(peticion, categorie.descripcion, this.idCategorie);
  }

  public updateCategorie(categorie: CategorieI){
    this.cargarFormulario(categorie);
  }

  public deleteCategorie(categorie: CategorieI){
    this.sweetAlert.dialogAlertQuestion(categorie.descripcion).then(data => {
      if (data.value){
        let peticion: Promise<any>;
        peticion = this.categorieService.deleteCategorie(categorie);
        this.showDialog(peticion, categorie.descripcion);
      }
    });
  }

  private showDialog(peticion: Promise<any>, title: string, idCategorie?: string){
    peticion.then(data => {
      if (data || idCategorie){
        this.sweetAlert.dialogAlertSuccess(title);
        this.limpiarFormulario();
      }
    }).catch(err => {
      if (err){
        this.sweetAlert.dialogAlertError(title);
      }
    });
  }

}
