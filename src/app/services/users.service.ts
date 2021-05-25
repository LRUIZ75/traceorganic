import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface User {
  username: string;
  password: string;
  person: string;
  email: string;
  isVerifiedEmail: boolean;
  creationDate: Date;
  roles: string[];
  company: string;
  refreshAccessToken: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public endpoint: string;
  public initOptions: any = {
    responseType: 'json',
    withCredentials: true,
  };

  constructor(private http: HttpClient) {
    this.endpoint = environment.apiURL + 'user/';
    //console.log('Conectando a :' + this.endpoint);
  }

  /**
   * Add new User
   * @param body Data for new User
   * @returns New User Data
   */
  addData(body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    const req = new HttpRequest('POST', `${this.endpoint}`, body, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Get User data
   * @param id User ID
   * @returns User Data or Array
   */
  getData(id?: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    const req = new HttpRequest('GET', `${this.endpoint}${id}`, null, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Update User data
   * @param id User ID
   * @param body Data to update
   * @returns Updated User data
   */
  updateData(id: string, body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    const req = new HttpRequest('PUT', `${this.endpoint}${id}`, body, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Delete User Data
   * @param id User ID
   * @returns Deleted User data
   */
  deleteData(id: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    const req = new HttpRequest('DELETE', `${this.endpoint}${id}`, null, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Deactivate User (isActive = false)
   * @param id User ID
   * @returns Deactivated User data
   */
  deactivateData(id: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    var body = { isActive: false };
    return this.updateData(id, body);
  }
}
