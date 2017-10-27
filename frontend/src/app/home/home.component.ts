import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PhotoService} from '../photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public photos;

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos()
      .then(photos => {
        this.photos = photos;
        console.log(this.photos);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSelect(photo) {
    console.log(photo.url);
  }

}
