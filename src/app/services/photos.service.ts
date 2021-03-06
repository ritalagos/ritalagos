import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ImageService } from './admin/image.service';
import { ImageI } from '../interfaces/admin/images.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  cargando = true;
  photos: ImageI[] = [];
  filterPhotos: ImageI[] = [];

  constructor(private http: HttpClient, private imagaService: ImageService) {
    this.cargarPhotos();
  }

  private cargarPhotos(){
    return new Promise((resolve, reject) => {
      this.imagaService.getAllImages()
      .subscribe((resp) => {
        this.photos = resp;
        this.addClassJson(resp);

        this.cargando = false;
        resolve();
      });
    });
  }

  buscarPhoto(termino: string){
    if (this.photos.length === 0){
      this.cargarPhotos().then(() => {
        this.filterPhoto(termino);
      });
    }else{
      this.filterPhoto(termino);
    }
  }

  private filterPhoto(termino: string){
    // this.filterPhotos = this.photos.filter(photo => { return true; });
    this.filterPhotos = [];

    termino = termino.toLocaleLowerCase();

    this.photos.forEach(photo => {
      if (photo.descripcion.toLocaleLowerCase().indexOf(termino) >= 0){
        this.filterPhotos.push(photo);
      }
    });
  }

  public addClassJson(res: ImageI[]){
    const clase = [
      ' ',
      'defilee__div--special1',
      'defilee__div--special2',
      'defilee__div--special3',
      'defilee__div--special4',
    ];

    for (let i = 0; i < res.length; i++){
      const random: number = this.getRandomArbitrary(0, 4);
      res[i]['clase'] = clase[random];
    }
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
