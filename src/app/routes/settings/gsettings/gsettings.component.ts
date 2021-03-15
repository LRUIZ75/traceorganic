import { Component, OnInit } from '@angular/core';
import { MtxGridColumn, MtxGridRowSelectionFormatter } from '@ng-matero/extensions';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@ng-matero/extensions';
import { debug } from 'node:console';
import {MAT_COLORS} from '../../../shared/utils/colors';

@Component({
  selector: 'app-settings-gsettings',
  templateUrl: './gsettings.component.html',
  styleUrls: ['./gsettings.component.css']
})
export class SettingsGsettingsComponent implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'Nombre', field: 'name' },
    { header: 'Peso', field: 'weight' },
    { header: 'Género', field: 'gender' },
    { header: 'Móvil', field: 'mobile', hide: true },
    { header: 'Ciudad', field: 'city' },
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

  list = [{
    "name":  "Luis",
    "weight": "170 lb",
    "gender": "masc",
    "mobile": "",
    "city": "MGA"
    },
    {
      "name":  "Sugeyli",
      "weight": "130 lb",
      "gender": "fem",
      "mobile": "",
      "city": "MGA"
      },
    {
      "name":  "Danilo",
      "weight": "165 lb",
      "gender": "masc",
      "mobile": "77425296",
      "city": "MGA"
    }
  ];

  multiSelectable = false;
  hideRowSelectionCheckbox = true;
  rowSelectable = true;
  rowSelected = this.list.slice(0);
  rowSelectionFormatter: MtxGridRowSelectionFormatter = {
    disabled: data => data.name === 'Boron',
    hideCheckbox: data => data.name === 'John',
  };
  rowHover = true;
  rowStriped = true;


  public selectedName : String;
  public addButtonColor = MAT_COLORS.red[100];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);


  constructor() { }

  ngOnInit() {
    this.selectedName= this.rowSelected[0].name;
    console.log(this.addButtonColor);
    
  }

  onRowSelection(e: any) {
    this.rowSelected = e;
    this.selectedName= this.rowSelected[0].name;
    //console.log(e);
  }


}
