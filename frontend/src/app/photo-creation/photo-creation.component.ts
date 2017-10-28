import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-photo-creation',
  templateUrl: './photo-creation.component.html',
  styleUrls: ['./photo-creation.component.css']
})
export class PhotoCreationComponent implements OnInit {

  private fileList: FileList = null;
  private title: String = null;

  constructor(private photoService: PhotoService, private router: Router) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.fileList = event.target.files;
  }

  upload() {
    console.log(this.fileList);
    console.log(this.title);

    if (this.fileList !== null && this.fileList.length > 0 && this.fileList.length < 2 && this.title !== null) {
      const file: File = this.fileList[0];
      const formData: FormData = new FormData();
      formData.append('photo', file, file.name);
      formData.append('title', this.title.toString());
      this.photoService.postPhoto(formData)
        .then(data => {
          console.log('success', data);
          this.router.navigate(['photo', (data as any)._id]);
        })
        .catch(error => {
          console.log(error);
        });

    }
  }

}
