import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export enum IdType {
  ID_CARD = 'ID-CARD',
  PASSPORT = 'PASSPORT',
  RESIDENCE = 'RESIDENCE',
  DRIVER = 'DRIVER',
}

export enum Genre {
  MASC = 'M',
  FEME = 'F',
  NDEF = 'U',
}

export interface Person {
    _id: string,
    names: string,
    lastNames: string,
    idType: IdType | string,
    idNumber: string,
    genre: Genre | string,
    mobile: string,
    birthDate: Date,    
    picture: string,
    isUser: boolean,
    isDriver: boolean
}

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  public endpoint: string;
  public initOptions: any = {
    responseType: 'json',
    withCredentials: true,
  };
  constructor(
    private http: HttpClient) {
    this.endpoint = environment.apiURL + 'person/';
    //console.log('Conectando a :' + this.endpoint);
  }

  /**
   * Add new Person
   * @param body Data for new Person
   * @returns New Person Data
   */
   addData(body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    const req = new HttpRequest('POST', `${this.endpoint}`, body, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Get Person data
   * @param id Person ID
   * @returns Person Data or Array
   */
  getData(id?: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    const req = new HttpRequest('GET', `${this.endpoint}${id}`, null, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Update Person data
   * @param id Person ID
   * @param body Data to update
   * @returns Updated Person data
   */
  updateData(id: string, body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    const req = new HttpRequest('PUT', `${this.endpoint}${id}`, body, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Delete Person Data
   * @param id Person ID
   * @returns Deleted Person data
   */
  deleteData(id: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    const req = new HttpRequest('DELETE', `${this.endpoint}${id}`, null, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Deactivate Person (isActive = false)
   * @param id Person ID
   * @returns Deactivated Person data
   */
  deactivateData(id: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = id === undefined ? '' : id;
    var body = { isActive: false };
    return this.updateData(id, body);
  }

  /**
   * Get image object from field name
   * @param filename Picture file name
   * @returns image object
   */
  getPicture(filename: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    filename = filename === undefined ? '' : filename;
    var initOptions: any = {
      responseType: 'blob',
      withCredentials: false,
    };
    const req = new HttpRequest('GET', `${this.endpoint}picture/${filename}`,initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Update picture into picture field
   * @param fieldName picture
   * @param id Person OID
   * @param picture File
   * @returns Success: path of updated image
   */
  updatePicture(id: string, picture: File, fieldName: string = 'picture'): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('picture', picture);

    const req = new HttpRequest(
      'PUT',
      `${this.endpoint}${fieldName}/${id}`,
      formData, this.initOptions
    );
    return this.http.request(req).pipe();
  }
}
