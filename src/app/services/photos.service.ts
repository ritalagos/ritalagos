import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PhotosInteface } from '../interfaces/photos.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  cargando = true;
  photos: PhotosInteface[] = [];
  filterPhotos: PhotosInteface[] = [];

  constructor(private http: HttpClient) {
    this.cargarPhotos();
  }

  private cargarPhotos(){
    return new Promise((resolve, reject) => {
      this.http.get('https://portafolio-rita.firebaseio.com/photos.json')
      .subscribe((resp: PhotosInteface[]) => {
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

  public addClassJson(res: PhotosInteface[]){
    const clase = [
      ' ',
      'defilee__div--special1',
      'defilee__div--special2',
      'defilee__div--special3',
      'defilee__div--special4',
    ];

    for(let i = 0; i < res.length; i++){
      const random: number = this.getRandomArbitrary(0, 4);
      res[i]['clase'] = clase[random];
    }
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
