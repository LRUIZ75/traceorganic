import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../authentication/token.service';
import { SettingsService } from '@core/bootstrap/settings.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private token: TokenService,
    private settings: SettingsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add server host
    const url = environment.SERVER_ORIGIN + req.url;

    // Only intercept API url
    if (!url.includes('/api/')) {
      return next.handle(req);
    }

    console.log('API CALL: ' + url);
    // All APIs need JWT authorization

    let headers: any;

    if (url.includes('/api/login/')) {
      headers = {
        'Accept': 'application/json',
        'Accept-Language': this.settings.language,
      };

      //newReq = req.clone({ url, setHeaders: headers});
      //console.log('Headers: ' + JSON.stringify(headers));

    } else if (url.includes('/picture/')) {
      headers = {
        'Accept': 'image/*',
        'Accept-Language': this.settings.language,
      };

      //return next.handle(req);
      
    } else {
      headers = {
        'Accept': 'application/json',
        'Accept-Language': this.settings.language,
        'Authorization': `Bearer ${this.token.get().token}`,
      };

    }

    const newReq = req.clone({ setHeaders: headers, withCredentials: true });

    //return next.handle(newReq);

    return next.handle(newReq).pipe(
      mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)),
      catchError((error: HttpErrorResponse) => this.handleErrorReq(error))
    );
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      const body: any = event.body;

      // failure: { status: 'error'|'**' message: 'failure' }
      // success: { status: 'ok',  message?: ' message', data: {}, token?: 'JWT Token'}
      if(event.ok)
        return of(event);
      if(event.statusText == "OK")
        return of(event);
      if (body && body.status !== 'ok') {
        if (body.message && body.message !== '') {
          this.toastr.error(body.msg);
        }
        return throwError([]);
      } else {
        return of(event); //regresa full la respuesta!, asi que ojo con el body!!!
      }
    }
    // Pass down event if everything is OK
    return of(event); //regresa full la respuesta!, asi que ojo con el body!!!
  }

  private handleErrorReq(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 304:
      case 200:
        break; 
      case 401:
        this.goto(`/auth/login`);
        break;
      case 403:
      case 404:
      case 500:
        if (error.url.includes('/api/'))
          this.toastr.error(error.error.message || `${error.status} ${error.statusText}`);
        else this.goto(`/sessions/${error.status}`);

        break;
      default:
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.message || `${error.status} ${error.statusText}`);
          this.toastr.error(`${error}`);
        }
        break;
    }
    return throwError(error);
  }
}
