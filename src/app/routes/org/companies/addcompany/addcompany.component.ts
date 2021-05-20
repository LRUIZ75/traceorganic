import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, CompaniesService } from 'app/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss'],
})
export class AddcompanyComponent implements OnInit {
  /**
   * Formulario de Agregar/Editar
   */
  companyFormGroup: FormGroup;
  company: Company;

  public latitude: any;
  public longitude: any;

  @Output() changeStateEvent = new EventEmitter<string>();

  @Input() formMode = 'ADD';
  @Input() initialData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompaniesService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.companyFormGroup = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      shortName: ['', [Validators.required]],
      isActive: [true, [Validators.required]],
      location: this.formBuilder.group({
        lat: [1, [Validators.required]],
        lng: [2, [Validators.required]],
      }),
      taxPayerCode: [''],
      countryISOCode: ['NIC'],
      logo: ['']
    });

    if (this.formMode == 'EDIT' && this.initialData) {
      this.companyFormGroup.patchValue(this.initialData as Company);
    }

    if (this.formMode == 'ADD') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.initialData = {
            fullName: '',
            shortName: '',
            isActive: true,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            taxPayerCode: '',
            countryISOCode: '',
            logo: ''
          };
          this.companyFormGroup.patchValue(this.initialData as Company);

          this.latitude = position.coords.latitude.toString();
          this.longitude = position.coords.longitude.toString();
          
        });
      }
    }
  }

  get fullName() {
    return this.companyFormGroup.get('fullName');
  }

  get shortName() {
    return this.companyFormGroup.get('shortName');
  }

  get lat() {
    return this.companyFormGroup.get('location').get('lat');
  }

  set lat(value) {
    this.companyFormGroup.get('location').get('lat').setValue(value);
  }

  get lng() {
    return this.companyFormGroup.get('location').get('lng');
  }

  set lng(value) {
    this.companyFormGroup.get('location').get('lng').setValue(value);
  }

  /**
   * Resetea el valor de todos los campos
   */
  onReset() {
    this.companyFormGroup.reset();
  }

  /**
   * Cancela el modo de agregar/editar
   */
  onCancel() {
    this.changeState('RETRIEVE');
  }

  /**
   * Cambia el estado actual de acceso a datos
   * @param value Nuevo Estado
   */
  changeState(value: string) {
    this.changeStateEvent.emit(value);
  }

  onSubmit() {
    if (!this.companyFormGroup.valid) {
      this.toaster.warning('EL FORMULARIO CONTIENE ERRORES');
      return;
    }

    this.company = <Company>this.companyFormGroup.value;

    switch (this.formMode) {
      case 'EDIT':
        this.companyService
          .updateData(this.initialData._id, this.company)
          .toPromise()
          .then(resp => {
            var response = <HttpResponse<any>> resp;
            if(response.statusText =='OK'){
              this.company = <Company> response.body.data;
              this.toaster.success('ACTUALIZADO!');
              this.changeState('RETRIEVE');
            }
            else {
              this.toaster.error('NO ACTUALIZADO!');
            }
          })
          .catch(err => {
            this.toaster.error('NO ACTUALIZADO!');
          });
        break;

      case 'ADD':
        this.companyService
          .addData(this.company)
          .toPromise()
          .then(resp => {
            var response = <HttpResponse<any>> resp;
            if(response.ok){
              this.company = <Company> response.body.data;
              this.toaster.success('AGREGADO!');
              this.changeState('RETRIEVE');
            }
            else {
              this.toaster.error('NO AGREGADO!');
            }
          })
          .catch(err => {
            this.toaster.error('NO AGREGADO!');
          });
        break;

      default:
        this.toaster.warning('MODO DE EDICIÓN DESCONOCIDO');
    }
  }
}
