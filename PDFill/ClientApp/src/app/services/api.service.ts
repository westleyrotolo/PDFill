import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
};
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', notifyError = true, callback?: () => void) {
    return (error: any): Observable<T> => {
      //finishLoading
      let contentMessage: string;
      try {
        contentMessage = error.error.message;
      } catch (e) {
        // do nothing
      }
      const statusCode = error.error.status;

      if (statusCode === 404 || statusCode === 500) {
        contentMessage = 'There was an unexpected error!';
      }
      else if (!contentMessage) {
        contentMessage = 'An error occurred: please check your connection and try again';
      }

      if (notifyError) {
        
       // this.confirmService.notify({ message: contentMessage }).then(() => {
          if (callback) {
            callback();
          }
      //  });
        
      }

      return new ErrorObservable(contentMessage);
    };
  }
  private startLoading(showLoading = true) {
    if (showLoading) {
    //  this.loadingService.show();
    //  this.loadingService.getMessage()
    }

  }

  private finishLoading() {
    const timer = Observable.timer(500);
    timer.subscribe(() => {
     // this.loadingService.hide();
    });
  
  }

  private log(resource: string, data: any) {
    // console.log(`------- ${resource} -------`);
    // console.log(data);
  }


  postFile(resource: string, body: any, notifyError = true, showLoading = true, callback?: () => void): Observable<any> {
    const url = "";

    this.startLoading(showLoading);

    return this.http
      .post(url, body)
      .pipe(
        tap(_ => {
          this.log(`post ${resource}`, _);
          if (showLoading) {
            this.finishLoading();
          }

        }),
        catchError(this.handleError(resource, notifyError, callback))
      );
  }

  get(resource: string, notifyError = true, showLoading = true, callback?: () => void): Observable<any> {
    const url = "" 
    this.startLoading(showLoading);

    return this.http
      .get<any>(url, httpOptions)
      .timeout(60000)
      .pipe(
        tap(_ => {
          this.log(`get ${resource}`, _);
          if (showLoading) {
            this.finishLoading();
          }

        }),
        catchError(this.handleError(resource, notifyError, callback))
      );
  }

  put(resource: string, body: any, notifyError = true, showLoading = true, callback?: () => void): Observable<any> {
    const url = "base" + resource;

    this.startLoading(showLoading);

    return this.http
      .put(url, body, httpOptions)
      .pipe(
        tap(_ => {
          this.log(`put ${resource}`, _);
          if (showLoading) {
            this.finishLoading();
          }
        }),
        catchError(this.handleError(resource, notifyError, callback))
      );
  }

  post(resource: string, body: any, notifyError = true, showLoading = true, callback?: () => void): Observable<any> {
    const url = "";

    this.startLoading(showLoading);

    return this.http
      .post(url, body, httpOptions)
      .pipe(
        tap(_ => {
          this.log(`post ${resource}`, _);
          if (showLoading) {
            this.finishLoading();
          }

        }),
        catchError(this.handleError(resource, notifyError, callback))
      );
  }


}
