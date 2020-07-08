import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../../../services/photos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: ActivatedRoute, public photoService: PhotosService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      // console.log(params['termino']);
      this.photoService.buscarPhoto(params['termino']);
    });
  }

}
