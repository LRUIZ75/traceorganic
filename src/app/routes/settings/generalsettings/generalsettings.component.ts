import { Component, OnInit } from '@angular/core';
import { MtxGridColumn, MtxGridRowSelectionFormatter } from '@ng-matero/extensions';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@ng-matero/extensions';
import {MAT_COLORS} from '../../../shared/utils/colors';
import {GeneralsettingService} from '../../../services/generalsetting/generalsetting.service';
import { GeneralSetting } from 'app/models/generalsetting.model';


@Component({
  selector: 'app-settings-gsettings',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css'],
  providers: [GeneralsettingService]
})
export class GeneralSettingsComponent implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'id', field: '_id', hide: true },
    { header: 'Compañía', field: 'companyName' },
    { header: 'País', field: 'countryISOCode' },
    { header: 'Logo', field: 'logo'},
    { header: 'RUC', field: 'taxPayerCode' },
/*     {
      header: 'Operación',
      field: 'operation',
      width: '120px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'editar',
          icon: 'edit',
          tooltip: 'Editar',
          click: () => {
            alert('edit');
          },
        },
        {
          type: 'icon',
          text: 'borrar',
          icon: 'delete',
          tooltip: 'Borrar',
          color: 'warn',
          pop: true,
          popTitle: 'Confirm delete?',
          click: () => {
            alert('delete');
          },
        },
      ],
    }, */
  ];


  multiSelectable = false;
  hideRowSelectionCheckbox = true;
  rowSelectable = true;
  rowSelected: any;

  rowSelectionFormatter: MtxGridRowSelectionFormatter ;

  rowHover = true;
  rowStriped = true;


  public selectedName : String;
  public addButtonColor = MAT_COLORS.red['A100'].toString;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  public generalSettings: GeneralSetting[]; //= [{_id:"0",companyName:"Loading.... Please wait", taxPayerCode:"",countryISOCode: "",logo : "" }];
  

  constructor(
    private _generalsettingService: GeneralsettingService
  ) { 
    
  }

  ngOnInit() {
     this._generalsettingService.getGeneralSettings().subscribe(
       response=> {
          if(response){
            var jsonResponse = JSON.stringify(response);
            var myResponse = JSON.parse(jsonResponse);
            if(myResponse.status != "ok" || myResponse.objects.length < 1)
              return;
            //console.log(jsonResponse);
            
            this.generalSettings = myResponse.objects as GeneralSetting[];
            this.rowSelected = this.generalSettings.slice(0);
            this.selectedName= this.rowSelected[0].companyName;

            this.rowSelectionFormatter = {
              disabled: data => data.companyName === 'CSI'
            };

            // console.log("Mis General Settings son: ");
            // console.log(typeof(this.generalSettings));
            // console.log(this.generalSettings);

          }
       },
       error => {
        console.log(error);
       }
     );
    
  }
  /**
   * on Row Selection event
   * @param  {any} e
   * Is the current row
   */
  onRowSelection(e: any) {
    this.rowSelected = e;
    this.selectedName= this.rowSelected[0].companyName;
    //console.log(e);
  }


}
