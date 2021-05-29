import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

//Import services
import { DataTableTranslations } from 'ornamentum';
import { HttpResponse } from '@angular/common/http';
import { User, UsersService, PeopleService, Person } from 'app/services';
import { removeAllListeners } from 'node:process';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-security-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService],
})
export class SecurityUsersComponent implements OnInit, DoCheck {
  /* Variables locales */

  public willUpdate: boolean = false;
  public lastState: string = 'RETRIEVE';
  public currentState: string = 'RETRIEVE';
  public selected: any;

  public userList: any[];

  public title: string;
  dragging = false;
  opened = false;

  public dataTableTranslations: DataTableTranslations;
  changeDetected: boolean;

  constructor(
    public userService: UsersService,
    public translate: TranslateService,
    public toaster: ToastrService,
    private confirmDialog: MatDialog
  ) {
    this.title = this.translate.instant('domain.people');
  }

  ngDoCheck(): void {
    if (this.lastState !== this.currentState) {
      this.changeDetected = true;
      console.log(`${this.lastState} -> ${this.currentState}`)
      this.lastState = this.currentState;
    }

    if (this.changeDetected) {
      console.log("UPDATING LIST");
      this.getList();
    }

    this.changeDetected = false;
  }

  getTitle() {
    this.title = this.translate.instant('domain.user');

    return this.title;
  }

  ngOnInit() {
    /*     if ('geolocation' in navigator) {
      console.log('geolocation is available');
    } else {
      console.log('geolocation is NOT available');
    } */

    this.getList();
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
    this.userService
      .getData()
      .toPromise()
      .then(res => {
        var response = <HttpResponse<any>>res;
        if (response.ok || response.body.status == 'ok') {
          this.userList = response.body.data;
          this.userList.forEach(e => {
            e.personName = e.person.names + " " + e.person.lastNames;
            e.roleslist= "";
            e.roles.forEach(r => {
              e.roleslist += (<string> (r.name?r.name: "")).toUpperCase(); +" ";
            });
          });


        } else this.userList = [];
      })
      .catch(err => {
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
    this.currentState = 'ADD';
  }

  edit(selected) {
    this.selected = selected._id;
    this.currentState = 'EDIT';
  }

  cantDelete(selected) {
    return !selected.isActive
  }

  confirmDelete(selected) {
    const confirmDialog = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('record_actions.deactivate'),
        message:
          this.translate.instant('notifications.can_deactivate') +
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
    this.selected = selected._id;

    this.userService
      .deactivateData(this.selected)
      .toPromise()
      .then(deactivated => {
        if (deactivated) {
          this.toaster.success('DESACTIVADO!');
          this.getList();
        } else {
          this.toaster.error('NO DESACTIVADO!');
          return;
        }
      })
      .catch(err => {
        this.toaster.error('NO ELIMINADO!');
        return;
      });
  }

  changeState(state: string) {
    this.currentState = state;
    if (state == 'RETRIEVE' && this.opened) {
      this.opened = false;
      this.getList();
    }
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }
}
