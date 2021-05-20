import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  public endpoint: string;
  public initOptions: any = {
    responseType: 'json',
    withCredentials: false,
  };

  constructor(private http: HttpClient) {
    this.endpoint = environment.apiURL + 'country/';
    //console.log('Conectando a :' + this.endpoint);
  }

  /**
   * Get Country data
   * @param cca3 Country ID
   * @returns Country Data or Array
   */
  getData(cca3?: string): Observable<HttpEvent<unknown> | HttpErrorResponse> {
    cca3 = cca3 === undefined ? '' : cca3;
    const req = new HttpRequest('GET', `${this.endpoint}${cca3}`, null, this.initOptions);
    return this.http.request(req).pipe();
  }
}
