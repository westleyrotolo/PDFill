import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class FileUploadService {

  constructor(private httpClient: HttpClient,
    private apiService: ApiService) { }


  sendDocument(idComm, docFile): Observable<any> {
    const formData = new FormData();
    formData.append('file', docFile);
    return this.apiService.postFile(`comms/${idComm}/document`, formData);
  }

}
