import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  public photo;
  public lat = 50;
  public lng = 10;

  constructor(private route: ActivatedRoute, private photoService: PhotoService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.photoService.getPhoto(id)
        .then(photo => {
          this.photo = photo;
          console.log(photo);
        })
        .catch(error => {
          this.router.navigate(['404']);
        });
   });
  }

}
