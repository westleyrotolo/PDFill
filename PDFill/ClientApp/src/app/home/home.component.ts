import { Component } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  file: any = null;

  constructor(private fileUploadService: FileUploadService) {

  }
  provideDoc($event) {
    this.file = $event.target.files[0];
  }
  saveDocument(filename) {
    if (this.file != null) {
      this.fileUploadService
        .sendDocument( this.file)
        .toPromise()
        .then(res => {
          console.log(res);
        });
    }
  }

  confirmComm(event?) {
    if (((!isUndefined(event) && event.keyCode == 13) || isUndefined(event)) && this.file != null) {
      console.log(this.file);
      this.saveDocument(this.file.name);
    }
  }

}
