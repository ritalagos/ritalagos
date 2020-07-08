import { Component, OnInit } from '@angular/core';
import { ItemServicesService } from '../../../services/item-services.service';
import { PhotosService } from '../../../services/photos.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  constructor(public photosServices: PhotosService) {
  }

  private cargaPhotos(){
    const defilee = new ItemServicesService(document.getElementById('defilee'));
    defilee.init();
  }

  ngOnInit(): void {
    this.cargaPhotos();
  }

}
