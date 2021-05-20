import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-500',
  template: `
    <error-code
      code="500"
      [title]="getTitle()"
      [message]= "getMessage()"
    >
    </error-code>
  `,
})
export class Error500Component {


  constructor(
    public translate: TranslateService){
    }
  getTitle(){
    return(this.translate.instant('HTTPSTATUS.Title500'));
  }

  getMessage(){
    return(this.translate.instant('HTTPSTATUS.Msg500'));
  }

  
}
