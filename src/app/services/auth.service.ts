import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  /**
   * Authenticates by credentials
   * @param body Credentials: username and password
   * @returns response.body: User data and JWT
   */
  login(body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    const req = new HttpRequest('POST', `${this.endpoint}`, body, {
      responseType: 'json',
      withCredentials: false
    });
    return this.http.request(req).pipe(); 
  } 
}