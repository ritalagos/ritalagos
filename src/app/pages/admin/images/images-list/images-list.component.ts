import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ImageService } from '../../../../services/admin/image.service';
import { ImageI } from '../../../../interfaces/admin/images.interface';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../services/sweet-alert.service';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  public images: ImageI[];
  public cargaCompleted = true;

  private sweetAlert: SweetAlertService = new SweetAlertService();
  widthClase = false;

  constructor(private modalService: NgbModal, public imageService: ImageService, private router: Router) {
    this.getAllImages();
  }

  ngOnInit(): void {
  }

  public getAllImages(){
    this.cargaCompleted = false;
    this.imageService.getAllImages().subscribe(data => {
      this.collectionSize = data.length;
      this.images = data.map((image, i) => ({
        idx: i + 1, ...image
      }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      this.cargaCompleted = true;
    });
  }

  public agregarImage(){
    this.router.navigate(['/admin/images/addImage']);
  }

  public deleteImage(image: ImageI){
    this.sweetAlert.dialogAlertQuestion(image.codigo).then(data => {
      if (data.value){
        let peticion: Promise<any>;
        peticion = this.imageService.deleteImageById(image, image.fileUrl);
        this.showDialog(peticion, image.descripcion);
      }
    });
  }

  public updateImage(image: ImageI){
    this.router.navigate(['/admin/images', image.id]);
  }

  private showDialog(peticion: Promise<any>, title: string){
    peticion.then(data => {
      if (data){
        this.sweetAlert.dialogAlertSuccess(title);
      }
    }).catch(err => {
      if (err){
        this.sweetAlert.dialogAlertError(title);
      }
    });
  }


  abrirModal(content) {
    this.modalService.open(content, {backdropClass: 'back-color-success'});
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
