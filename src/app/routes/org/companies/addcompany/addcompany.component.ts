import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, CompaniesService, Country, CountriesService } from 'app/services';
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
  public countries: Country[];

  public latitude: any;
  public longitude: any;

  files: File[] = [];
  picture: any;

  @Output() changeStateEvent = new EventEmitter<string>();

  @Input() formMode = 'ADD';
  @Input() initialData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompaniesService,
    private countryService: CountriesService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCountriesList();

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
      logo: [''],
    });

    if (this.formMode == 'EDIT' && this.initialData) {
      this.companyFormGroup.patchValue(this.initialData as Company);

      if (this.initialData.logo) {
        this.companyService
          .getPicture(this.initialData.logo)
          .toPromise()
          .then(res => {
            var response = <HttpResponse<any>>res;
            var imgFile = new File([response.body], this.initialData.logo, {
              type: response.headers.get('Content-Type'),
            });
            this.files.push(imgFile);
          })
          .catch(err => {
            if (err) console.log(err);
          });
      }
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
            taxPayerCode: [''],
            countryISOCode: ['NIC'],
            logo: [''],
          };
          this.companyFormGroup.patchValue(this.initialData as Company);

          this.latitude = position.coords.latitude.toString();
          this.longitude = position.coords.longitude.toString();
        });
      }
    }
  }

  /**
   * Obtiene lista de paises
   */
  getCountriesList() {
    this.countryService
      .getData()
      .toPromise()
      .then(res => {
        var response = <HttpResponse<any>>res;
        if (response.ok) this.countries = <Country[]>response.body.data;
        else this.countries = [];
      });
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
          .then(res => {
            var response = <HttpResponse<any>>res;
            if (response.ok) {
              this.company = <Company>response.body.data;
              this.toaster.success('ACTUALIZADO!');

              if (this.files.length > 0 && this.files[0].name != this.company.logo)
                this.updatePicture(this.company._id);
              this.changeState('RETRIEVE');
            } else {
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
          .then(res => {
            var response = <HttpResponse<any>>res;
            if (response.ok) {
              this.company = <Company>response.body.data;
              this.toaster.success('AGREGADO!');
              if (this.files.length > 0 && this.files[0].name != this.company.logo)
                this.updatePicture(this.company._id);
              this.changeState('RETRIEVE');
            } else {
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

  /**
   * Updates company logo
   * @param id Company OID
   */
  updatePicture(id: string) {
    if (!id || !this.files) return;
    if (this.files.length == 0) return;

    this.companyService
      .updatePicture(id, this.files[0])
      .toPromise()
      .then(res => {
        var response = <HttpResponse<any>>res;
        if (!response.ok) this.toaster.error('LOGO NO ACTUALIZADO!');
      });
  }

  onSelect(event) {
    if (this.files.length > 0) {
      this.files = [];
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files = [];
    this.companyFormGroup.get('logo').setValue('');
  }
}
