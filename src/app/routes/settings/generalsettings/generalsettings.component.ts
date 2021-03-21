import { Component, OnInit } from '@angular/core';
import { MtxGridColumn, MtxGridRowSelectionFormatter } from '@ng-matero/extensions';
import { FormControl, FormsModule } from '@angular/forms';
import { TooltipPosition } from '@ng-matero/extensions';
import { GeneralsettingService } from '../../../services/generalsetting/generalsetting.service';
import { GeneralSetting } from 'app/models/generalsetting.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

export enum ActionMode {
  retrieve,
  create,
  edit,
}

@Component({
  selector: 'app-settings-general',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css'],
  providers: [GeneralsettingService],
})
export class GeneralSettingsComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'id', field: '_id', hide: true },
    { header: 'Compañía', field: 'companyName' },
    { header: 'País', field: 'countryISOCode' },
    { header: 'Logo', field: 'logo' },
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

  rowSelectionFormatter: MtxGridRowSelectionFormatter;

  rowHover = true;
  rowStriped = true;

  public selectedName: String;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  public generalSettings: GeneralSetting[]; //= [{_id:"0",companyName:"Loading.... Please wait", taxPayerCode:"",countryISOCode: "",logo : "" }];
  public currentAction: string;
  public newGeneralSetting: any;

  constructor(
    private _generalsettingService: GeneralsettingService,
    private toaster: ToastrService,
    private translate: TranslateService
  ) {
    this.newGeneralSetting = {
      companyName: '',
      taxPayerCode: '',
      countryISOCode: '',
      logo: '',
    };
  }

  ngOnInit() {
    this.currentAction = 'retrieve';
    this.loadData();
  }

  loadData() {
    this._generalsettingService.getGeneralSettings().subscribe(
      response => {
        if (response) {
          var jsonResponse = JSON.stringify(response);
          var myResponse = JSON.parse(jsonResponse);
          if (myResponse.status != 'ok' || myResponse.objects.length < 1) return;
          //console.log(jsonResponse);

          this.generalSettings = myResponse.objects as GeneralSetting[];
          this.rowSelected = this.generalSettings.slice(0);
          this.selectedName = this.rowSelected[0].companyName;

          this.rowSelectionFormatter = {
            disabled: data => data.companyName === 'CSI',
          };
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  loadRecord(eventData: any) {
    console.log(eventData);
    this.newGeneralSetting = eventData;

    console.log(this.newGeneralSetting);
    this.changeActionMode('edit');
  }

  /**
   * on Row Selection event
   * @param  {any} e
   * Is the current row
   */
  onRowSelection(e: any) {
    this.rowSelected = e;
    this.selectedName = this.rowSelected[0].companyName;
    //console.log(e);
  }

  changeActionMode(mode: string) {
    this.currentAction = mode;
    console.log('Current Mode is: ' + this.currentAction);
  }

  isValid() {
    if (!this.newGeneralSetting.companyName || !this.newGeneralSetting.taxPayerCode) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.isValid()) return;

    console.log(JSON.stringify(this.newGeneralSetting));

    if (this.currentAction == 'create') {
      this._generalsettingService.addGeneralSetting(this.newGeneralSetting)
      .subscribe(
        response => {
          if (response) {
            var jsonResponse = JSON.stringify(response);
            var myResponse = JSON.parse(jsonResponse);
            if (myResponse.status != 'ok' || myResponse.created.length < 1) return;

            var newObject: any;
            newObject = myResponse.created as GeneralSetting;
            var msg = this.translate.instant('record_actions.saved');
            this.toaster.info(msg);
            console.log(newObject);
            this.loadData();
          }
        },
        error => {
          var msg = this.translate.instant('record_actions.error_occurred');
          this.toaster.error(error.statusText + ': ' + error.message, msg);
        }
      );
    }

    if (this.currentAction == 'edit') {
      this._generalsettingService
        .updateGeneralSetting(this.newGeneralSetting._id, this.newGeneralSetting)
        .subscribe(
          response => {
            if (response) {
              var jsonResponse = JSON.stringify(response);
              var myResponse = JSON.parse(jsonResponse);
              if (myResponse.status != 'ok' || myResponse.updated.length < 1) return;

              var newObject: any;
              newObject = myResponse.updated as GeneralSetting;
              var msg = this.translate.instant('record_actions.saved');
              this.toaster.info(msg);
              console.log(newObject);
              this.loadData();
            }
          },
          error => {
            console.log(error);
            var msg = this.translate.instant('record_actions.error_occurred');
            this.toaster.error(error.statusText + ': ' + error.message, msg);
          }
        );
    }
    
    this.changeActionMode('retrieve');
    
  }
}
