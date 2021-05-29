import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

//Import services
import { DataTableTranslations } from 'ornamentum';
import { HttpResponse } from '@angular/common/http';
import { PeopleService, Person, GENRES, IDTYPES } from 'app/services';

@Component({
  selector: 'app-security-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [PeopleService],
})
export class SecurityPeopleComponent implements OnInit, DoCheck {
  /* Variables locales */

  public willUpdate: boolean = false;
  public lastState: string = 'RETRIEVE';
  public currentState: string = 'RETRIEVE';
  public selected: any;

  public peopleList: any[];

  public title: string;
  dragging = false;

  genreList = Object.keys(GENRES).map(function (key) {
    return { id: GENRES[key], name: key };
  });

  idTypesList = Object.keys(IDTYPES).map(function (key) {
    return { id: IDTYPES[key], name: key };
  });

  public dataTableTranslations: DataTableTranslations;
  changeDetected: boolean;

  constructor(
    public peopleService: PeopleService,
    public translate: TranslateService,
    public toaster: ToastrService,
    private confirmDialog: MatDialog
  ) {
    this.title = this.translate.instant('domain.people');
  }

  ngDoCheck(): void {
    if (this.lastState !== this.currentState) {
      this.changeDetected = true;
      console.log(`INFO: ${this.lastState} -> ${this.currentState}`);
      this.lastState = this.currentState;
    }

    if (this.changeDetected) {
      console.log('INFO: UPDATING LIST');
      this.getList();
    }

    this.changeDetected = false;
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
    this.peopleService
      .getData()
      .toPromise()
      .then(res => {
        var response = <HttpResponse<any>>res;
        if (response.ok || response.body.status == 'ok') {
          this.peopleList = response.body.data; // as Person[]
          this.peopleList.forEach(p => {
            p.fullName = p.names + ' ' + p.lastNames;
            p.genreName = this.translate
              .instant(this.genreList.find(g => g.id == p.genre).name)
              .toUpperCase();
            p.idTypeName = this.translate
              .instant(this.idTypesList.find(t => t.id == p.idType).name)
              .toUpperCase();
          });
        } else this.peopleList = [];
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
    return selected.isUser || selected.isDriver;
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
    this.selected = selected._id;

    this.peopleService
      .deleteData(this.selected)
      .toPromise()
      .then(deleted => {
        if (deleted) {
          this.toaster.success('ELIMINADO!');
          this.getList();
        } else {
          this.toaster.error('NO ELIMINADO!');
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
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }
}
