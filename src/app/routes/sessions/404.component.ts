import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-404',
  template: `
    <error-code
      code="404"
      [title]="getTitle()"
      [message]= "getMessage()"
    >
    </error-code>
  `,
})
export class Error404Component {


  constructor(
    public translate: TranslateService){
    }
  getTitle(){
    return(this.translate.instant('HTTPSTATUS.Title404'));
  }

  getMessage(){
    return(this.translate.instant('HTTPSTATUS.Msg404'));
  }

  
}
