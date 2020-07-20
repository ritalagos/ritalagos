import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriesList: AngularFireList<CategorieI>;

  constructor(db: AngularFireDatabase) {
    this.categoriesList = db.list('categoria');
  }

  public getAllCategories(){
    return this.categoriesList.snapshotChanges().pipe(
      map(changes => changes.map(data => (
        {
            key: data.payload.key, ...data.payload.val()
        }))
      )
    );
  }

  public addCategorie(categorie: CategorieI) {
    return this.categoriesList.push(categorie);
  }

  public updateCategorie(key: string, categorie: CategorieI) {
    return this.categoriesList.update(key, categorie);
  }

  public deleteCategorie(categorie: CategorieI) {
    return this.categoriesList.remove(categorie.key);
  }

}

export interface CategorieI{
  key?: string;
  cod: string;
  descripcion: string;
}
