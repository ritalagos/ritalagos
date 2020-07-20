import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../../services/admin/image.service';
import { ImageI } from '../../../../interfaces/admin/images.interface';
import { CategoriaService, CategorieI } from '../../../../services/categoria.service';
import { SweetAlertService } from '../../../../services/sweet-alert.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  formulario: FormGroup;
  urlImg = '/assets/images/drop.png';
  private fileImg: any;
  private fileImgOriginal: any;
  private idImage: string;
  public categories: CategorieI[];
  private sweetAlert: SweetAlertService = new SweetAlertService();

  constructor(private fb: FormBuilder, private imageService: ImageService,
              private activateRouter: ActivatedRoute, private router: Router,
              private categoriaService: CategoriaService) {
    this.cargarFormulario();
  }

  ngOnInit(): void {
    this.getAllCategories();

    this.idImage = this.activateRouter.snapshot.params.idImage;
    if (this.idImage) {
      this.imageService.getOneImage(this.idImage).subscribe(data => {
        this.cargarDataFormulario(data);
      });
    }
  }

  private cargarFormulario(){
    this.formulario = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', ],
    });
  }

  private cargarDataFormulario(image: ImageI){
    this.formulario.setValue({
      codigo: image.codigo,
      descripcion: image.descripcion,
      categoria: image.categoria
    });
    this.urlImg = image.fileUrl;
    this.fileImg = image.fileUrl;
    this.fileImgOriginal = image.fileUrl;
  }

  private limpiarFormulario(){
    this.formulario.reset({
      codigo: '',
      descripcion: '',
      categoria: ''
    });
    this.fileImg = null;
  }

  private getAllCategories(){
    this.categoriaService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  get codigoNoValido(){
    return this.validarCampos('codigo');
  }
  get descripcionNoValido(){
    return this.validarCampos('descripcion');
  }

  private validarCampos(nombreCampo: string){
    return this.formulario.get(nombreCampo).invalid && this.formulario.get(nombreCampo).touched;
  }

  public cargarImage(event: any){
    const img = event.target.files[0];

    if (event.target.files && img) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.urlImg = e.target.result;
      };
      reader.readAsDataURL(img);
      this.fileImg = img;
    }else{
      console.log('formato desconocido');
    }
  }

  public cancelarAddAndUpdate(){
    this.router.navigate(['../../images'],  {relativeTo: this.activateRouter});
  }

  public addAndUpdate(){
    if (this.formulario.invalid){
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.sweetAlert.dialogAlertWait();
    let estadoImage = false;

    const image: ImageI = this.formulario.value;

    if (this.idImage) {
      if (this.fileImg === this.fileImgOriginal){
        image.fileUrl = this.fileImgOriginal;
        estadoImage = this.imageService.updateImage(image, this.idImage);
      }else{
        image.id = this.idImage;
        estadoImage = this.imageService.updateImage(image, this.idImage, this.fileImg, this.fileImgOriginal);
      }
    }else {
      estadoImage = this.imageService.addImage(image, this.fileImg);
    }
    this.showDialog(estadoImage, image.codigo);
  }

  private showDialog(peticion: boolean, title: string){
    if (peticion){
      this.sweetAlert.dialogAlertSuccess(title);
      this.limpiarFormulario();
      this.cancelarAddAndUpdate();
    }else{
      this.sweetAlert.dialogAlertError(title);
    }
  }


}
