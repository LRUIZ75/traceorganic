import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-403',
  template: `
    <error-code
      code="403"
      [title]="getTitle()"
      [message]= "getMessage()"
    >
    </error-code>
  `,
})
export class Error403Component {


  constructor(
    public translate: TranslateService){
    }
  getTitle(){
    return(this.translate.instant('HTTPSTATUS.Title403'));
  }

  getMessage(){
    return(this.translate.instant('HTTPSTATUS.Msg403'));
  }

  
}
