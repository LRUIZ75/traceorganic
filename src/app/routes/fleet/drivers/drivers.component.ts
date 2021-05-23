import { Component, OnInit, Input } from '@angular/core';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

//Import services
import { Company, CompaniesService, Employee, EmployeesService, Person,PeopleService, Driver,DriversService} from 'app/services';
import { DataTableTranslations } from 'ornamentum';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-fleet-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  providers: [CompaniesService, EmployeesService, PeopleService, DriversService]
})
export class FleetDriversComponent implements OnInit {
  /* Variables locales */

  public currentState: string = 'RETRIEVE';
  public selected:  Driver;

  public driverList: any[]=[];
  public companyList: any[] = [];
  public employeeList: any[]=[];
  public personList: any[]=[];
  public title: string;
  dragging = false;
  opened = false;

  public dataTableTranslations: DataTableTranslations = {
    pagination: {
      limit: this.translate.instant('pagination.limit'),
      rangeKey: this.translate.instant('pagination.records'),
      rangeSeparator: this.translate.instant('pagination.of'),
      nextTooltip: this.translate.instant('pagination.next'),
      previousTooltip: this.translate.instant('pagination.previous'),
      lastTooltip: this.translate.instant('pagination.last'),
      firstTooltip: this.translate.instant('pagination.first'),
    },
  };

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
       selectPlaceholder: this.translate.instant('record_actions.search')
     },
     columnSelector: { header: ">>"}


   };
   return this.dataTableTranslations;
 }

  getCompanyList() {
    this.companyService
      .getData()
      .toPromise()
      .then(res => {
        var response = <HttpResponse<any>> res;
        if(response.statusText =="OK")
          this.companyList = response.body.data;
      });
  }
  getEmployeeList() {
    this.employeeService
      .getData()
      .toPromise()
      .then(resp => {
        this.employeeList = resp.objects;
      });
  }
  getPersonList() {
    this.personService
      .getData()
      .toPromise()
      .then(res => {
        var response = <HttpResponse<any>> res;
        if(response.ok)
          this.personList = response.body.data;
      });
  }

  @Input() filter: string = '';

  constructor(
    public companyService: CompaniesService,
    public employeeService: EmployeesService,
    public personService: PeopleService,
    public driverService: DriversService,
    public translate: TranslateService,
    public toaster: ToastrService,
    private confirmDialog: MatDialog
  ) {
    this.title = this.translate.instant('domain.drivers');
    this.getCompanyList();
    this.getEmployeeList();
    this.getPersonList();
    this.getList();
  }

  getTitle()
  {
    this.title = this.translate.instant('domain.drivers');
    return this.title;
  }

  ngOnInit() {

    if('geolocation' in navigator) {
      console.log('geolocation is available');
    } else {
      console.log('geolocation is NOT available');
    }

  }

  getList() {

    this.driverService.getData().subscribe(
      res => {
        if (res) {
            var jsonResponse = JSON.stringify(res);
            var response = JSON.parse(jsonResponse);
            if (response.status != 'ok') return;
            this.driverList = response.objects;
            this.driverList = this.driverList.filter(it => it.isActive == true);
            if (this.filter) {
              this.driverList = this.driverList.filter(
                it => it.isActive == true && it.company == this.filter
              );
            }

            for (var i = 0; i < this.driverList.length; i++) {
              var comp = this.companyList.find(it => it._id == this.driverList[i].company);
              //var emp = this.employeeList.find(it => it._id == this.driverList[i].employee);
              var per = this.personList.find(it => it._id == this.driverList[i].person);
              this.driverList[i].companyName = !comp?"":comp.fullName;
              this.driverList[i].personName = !per?"":(per.names + " " + (!per.lastNames?"":per.lastNames) );
            }
        }
      },
      err => {
        if(err.substring(0,3)!= '404'){
          var msg = this.translate.instant('record_actions.error_occurred');
          this.toaster.error(err);
        }
      }
    );
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

  edit(selected){
    this.selected = selected;
    this.opened = true;
    this.currentState = 'EDIT';
  }

  delete(selected){
    this.selected = selected;

    this.driverService.deactivateData(selected._id).
    toPromise()
    .then( deleted => {
      if(deleted){
        this.toaster.success("Operación exitosa!");
        this.getList();
      }
      else
        {
          this.toaster.error("Operación fallida!");
          return;
        }
    }).
    catch(err => {
      this.toaster.error(err);
      return;
    })


  }


  confirmDelete(selected) {

    const confirmDialog = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('record_actions.deactivate'),
      //ODEM Cambiar la propiedad de select
        message: this.translate.instant('notifications.can_deactivate') + ': ' + selected.personName + ' ?',
        button1Text: this.translate.instant('buttons.yes').toUpperCase(),
        button2Text: this.translate.instant('buttons.no').toUpperCase(),
      },
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result == true) this.delete(selected);
    });
  }

  changeState(state: string){
    this.currentState = state;
    if(state=='RETRIEVE')
      this.getList();
  }

}

