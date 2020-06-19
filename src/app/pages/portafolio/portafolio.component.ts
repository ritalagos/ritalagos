import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {

  constructor(public photoService: PhotosService) {
   }

  ngOnInit(): void {
  }

}
