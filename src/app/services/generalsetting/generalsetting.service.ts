import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {GeneralSetting} from '../../models/generalsetting.model';
import {Global} from '../global';

@Injectable({
  providedIn: 'root'
})
export class GeneralsettingService {

  public url: string;
  constructor(
    private _http: HttpClient

  ){
    this.url = Global.url; 
  }



  getGeneralSettings(){
    return this._http.get(this.url + 'generalsetting');
  }

}
