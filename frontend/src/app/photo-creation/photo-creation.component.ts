import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';


@Component({
  selector: 'app-photo-creation',
  templateUrl: './photo-creation.component.html',
  styleUrls: ['./photo-creation.component.css']
})
export class PhotoCreationComponent implements OnInit {

  private fileList: FileList = null;
  private title: String = null;

  constructor(private photoService: PhotoService) {
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
          console.log('success');
        })
        .catch(error => {
          console.log(error);
        });

    }
  }

}
