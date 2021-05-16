import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface Company {
  _id: string;
  fullName: string;
  shortName: string;
  isActive: boolean;
  location: {
    lat: number;
    lng: number;
  };
  taxPayerCode: string;
  countryISOCode: string;
  logo: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  public endpoint: string;
  public initOptions: any = {
    "responseType": "json",
    "withCredentials": true
    };

  constructor(private http: HttpClient) {
    this.endpoint = environment.apiURL + 'company/';
    //console.log('Conectando a :' + this.endpoint);
  }

  /**
   * Add new Company
   * @param body Data for new Company
   * @returns New Company Data
   */
  addData(body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    const req = new HttpRequest('POST', `${this.endpoint}`, body, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Get Company data
   * @param id Company ID
   * @returns Company Data or Array
   */
  getData(id?: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = (id === undefined)?'':id;
    const req = new HttpRequest('GET', `${this.endpoint}${id}`, null, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Update Company data
   * @param id Company ID
   * @param body Data to update
   * @returns Updated company data
   */
  updateData(id: string, body: any): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = (id === undefined)?'':id;
    const req = new HttpRequest('PUT', `${this.endpoint}${id}`, body, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Delete Company Data
   * @param id Company ID
   * @returns Deleted company data
   */
  deleteData(id: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = (id === undefined)?'':id;
    const req = new HttpRequest('DELETE', `${this.endpoint}${id}`, null, this.initOptions);
    return this.http.request(req).pipe();
  }

  /**
   * Deactivate Company (isActive = false)
   * @param id Company ID
   * @returns Deactivated Company data
   */
  deactivateData(id: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    id = (id === undefined)?'':id;
    var body = {isActive: false};
    return this.updateData(id,body);
  }
}
