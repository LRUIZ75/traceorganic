import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
    console.log('Conectando a :' + this.endpoint);
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.status, error.error.message);
    } else {
      console.error(
        `El backend devolvió =>
    ${error.message}`
      );
      console.debug(JSON.stringify(error.error));
    }
    return throwError(`${error.status} ` + JSON.stringify(error.error));
  }

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }


  login(body: any): Observable<any> {
    return this.http.post(this.endpoint,body).pipe(map(this.extractData), catchError(this.handleError));
  }
  
}
