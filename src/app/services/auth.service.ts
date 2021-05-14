import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.apiURL + 'login/';
    //console.log('Conectando a: ' + this.endpoint);
  }

/*   private handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(`${error.status} ` + JSON.stringify(error.error));
  }

  private extractData(res: HttpResponse<any>): any {
    const body = res;
    return body || {};
  } */

/*   login(body: any): Observable<any> {
    return this.http.post(this.endpoint,body).pipe(map(this.extractData), catchError(this.handleError));
  } */

  login(body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
 /*    let formData: FormData = new FormData();
    formData.append('body', body); */
    const req = new HttpRequest('POST', `${this.endpoint}`, body, {
      responseType: 'json',
      withCredentials: false
    });
    return this.http.request(req).pipe(); //Acá no se requieren los pipes repetidos en cada servicio.!!!!
  } 
}