import { Component, OnInit } from '@angular/core';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

//Import services
import { DataTableTranslations } from 'ornamentum';
import { HttpResponse } from '@angular/common/http';
import { PeopleService, Person } from 'app/services';

@Component({
  selector: 'app-security-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [PeopleService],
})
export class SecurityPeopleComponent implements OnInit {
  /* Variables locales */

  public currentState: string = 'RETRIEVE';
  public selected: Person;

  public peopleList: any[];
  
  public title: string;
  dragging = false;
  opened = false;

  public dataTableTranslations: DataTableTranslations;

  constructor(
    public peopleService: PeopleService,
    public translate: TranslateService,
    public toaster: ToastrService,
    private confirmDialog: MatDialog
  ) {
    this.title = this.translate.instant('domain.people');
    this.getList();
  }

  getTitle() {
    this.title = this.translate.instant('domain.people');

    return this.title;
  }

  ngOnInit() {
/*     if ('geolocation' in navigator) {
      console.log('geolocation is available');
    } else {
      console.log('geolocation is NOT available');
    } */
  }

  getDataTableTranslations(): DataTableTranslations {
    this.dataTableTranslations = {
      pagination: {
        limit: this.translate.instant('pagination.limit'),
        rangeKey: this.translate.instant('pagination.records'),
        rangeSeparator: this.translate.instant('pagination.of'),
        nextTooltip: this.translate.instant('pagination.next'),
        previousTooltip: this.translate.instant('pagination.previous'),
        lastTooltip: this.translate.instant('pagination.last'),
        firstTooltip: this.translate.instant('pagination.first'),
      },
      noDataMessage: this.translate.instant('notifications.nodata'),
      dropdownFilter: {
        filterPlaceholder: this.translate.instant('record_actions.search'),
        selectPlaceholder: this.translate.instant('record_actions.search'),
      },
      columnSelector: { header: '>>' },
    };
    return this.dataTableTranslations;
  }

  getList() {
    this.peopleService
      .getData()
      .toPromise()
      .then(res => {
        var response = <HttpResponse<any>>res;
        if (response.ok || response.body.status == "ok") 
         { this.peopleList = response.body.data;// as Person[]
          this.peopleList.forEach(p =>{
            p.fullName = p.names + " " + p.lastNames;
          });}
        else this.peopleList =[];
      })
      .catch(err =>{
        this.toaster.error(err);
      });
  }

  handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }

  openPanel(event: MouseEvent) {
    if (this.dragging) {
      this.dragging = false;
      return;
    }
    this.selected = undefined;
    this.opened = true;
    this.currentState = 'ADD';
  }

  edit(selected) {
    this.selected = selected;
    this.opened = true;
    this.currentState = 'EDIT';
  }

  cantDelete(selected) {
    return (selected.isUser || selected.isDriver);
  }

  confirmDelete(selected) {
    const confirmDialog = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('record_actions.delete'),
        message:
          this.translate.instant('notifications.can_delete') +
          ': ' +
          selected.names +
          ' ' +
          selected.lastNames +
          ' ?',
        button1Text: this.translate.instant('buttons.yes').toUpperCase(),
        button2Text: this.translate.instant('buttons.no').toUpperCase(),
      },
    });

    //Ejemplo de un confirmDialog sin data injection => Versión básica
    //const confirmDialog = this.confirmDialog.open(ConfirmDialogComponent);

    confirmDialog.afterClosed().subscribe(result => {
      if (result == true) this.delete(selected);
    });
  }

  delete(selected) {
    this.selected = selected;

    this.peopleService
      .deleteData(selected._id)
      .toPromise()
      .then(deleted => {
        if (deleted) {
          this.toaster.success('DESACTIVADO!');
          this.getList();
        } else {
          this.toaster.error('NO DESACTIVADO!');
          return;
        }
      })
      .catch(err => {
        this.toaster.error('NO DESACTIVADO!');
        return;
      });
  }

  changeState(state: string) {
    this.currentState = state;
    if (state == 'RETRIEVE') this.getList();
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }
}
