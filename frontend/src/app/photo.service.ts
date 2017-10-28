import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
// import { FileUploader } from 'ng2-file-upload';

@Injectable()
export class PhotoService {
  private url;
  private photoURL;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8200/';
    this.photoURL = 'http://localhost:8200/public/photos/';
  }

  getPhotos() {
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.url + 'photo')
          .subscribe(photos => {
            (photos as any).map(photo => {
              photo.url = this.photoURL + photo.url;
            });
            resolve(photos);
          });
      }
    );
  }

  getPhoto(id) {
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.url + 'photo/' + id)
          .subscribe(
            photo => {
              if (photo) {
                (photo as any).url = this.photoURL + (photo as any).url;
                resolve(photo);
              } else {
                reject('Photo not found');
              }
            },
            error => {
              reject('Photo not found');
            }
          );
      }
    );
  }

  postPhoto(formData: FormData) {
    return new Promise(
      (resolve, reject) => {
        this.http.post(this.url + 'photo', formData)
          .subscribe(
              data => {
                console.log('success');
                resolve(data);
              },
              error => {
                console.log(error);
                reject(error);
              }
          );
      }
    );
  }


}
