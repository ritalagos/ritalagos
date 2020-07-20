import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';

import { ImageI } from '../../interfaces/admin/images.interface';
import { FileI } from '../../interfaces/admin/file.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imagesCollection: AngularFirestoreCollection<ImageI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.imagesCollection = this.afs.collection<ImageI>('images');
  }

  public getAllImages(): Observable<ImageI[]>{
    return this.imagesCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(data => {
          const dataImg = data.payload.doc.data() as ImageI;
          const id = data.payload.doc.id;
          return { id, ...dataImg };
        })
      )
    );
  }

  public getOneImage(id: string): Observable<ImageI>{
    return this.afs.doc<ImageI>(`images/${id}`).valueChanges();
  }

  public async deleteImageById(image: ImageI, fileImg: string){
    try{
      await this.deleteFileImg(fileImg);
      return this.imagesCollection.doc(image.id).delete();
    }catch (error){
      console.log('Error:', error);
    }
  }

  public updateImage(image: ImageI, idImagen: string, newFileImg?: FileI, deleteImg?: string){
    let modify = false;
    if (newFileImg){
       if (this.uploadImageAddImage(image, newFileImg)){
        this.deleteFileImg(deleteImg);
        modify = true;
       }
    }else{
      this.imagesCollection.doc(idImagen).update(image);
      modify = true;
    }
    return modify;
  }

  public addImage(image: ImageI, fileImg: FileI){
    if (this.uploadImageAddImage(image, fileImg)){
     return true;
   }else{
     return false;
   }
  }

  private saveImage(image: ImageI){
    const imageObj = {
      codigo: image.codigo,
      descripcion: image.descripcion,
      fileUrl: this.downloadURL,
      categoria: image.categoria,
      fecha: new Date()
    };
    if (image.id) {
      return this.imagesCollection.doc(image.id).update(imageObj);
    }else{
      return this.imagesCollection.add(imageObj);
    }
  }


  private uploadImageAddImage(image: ImageI, fileImg: FileI){
    const message = {data: false, error: ''};
    if (fileImg){
      this.filePath = `images/${fileImg.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, fileImg);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( urlImage => {
            this.downloadURL =  urlImage;
            this.saveImage(image);
            message.data = true;
          }, err => message.error = err);
        })
      ).subscribe();
      return message;
    }
  }

  private deleteFileImg(fileImg: string){
    return this.storage.storage.refFromURL(fileImg).delete();
  }

}
