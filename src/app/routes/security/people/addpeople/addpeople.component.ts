import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDTYPES, GENRES, Person, PeopleService } from 'app/services';
import { ToastrService } from 'ngx-toastr';
import * as dayjs from 'dayjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-addpeople',
  templateUrl: './addpeople.component.html',
  styleUrls: ['./addpeople.component.scss'],
})
export class AddpeopleComponent implements OnInit {
  /**
   * Formulario de Agregar/Editar
   */
  personFormGroup: FormGroup;
  public person: Person;
  public newPerson: any = {};

  files: File[] = [];
  picture: any;

  genreList = Object.keys(GENRES).map(function (key) {
    return {id: GENRES[key], name: key};
  });

  idTypesList = Object.keys(IDTYPES).map(function (key) {
    return {id: IDTYPES[key], name: key};
  });


  public birthday: Date;
  //Edad máxima -> 80 años, especialmente si conductor
  public minBirthday = dayjs().subtract(80, 'year').toISOString();
  //Edad mínima -> 15 años, especialmente si conductor transportista
  public maxBirthday = dayjs().subtract(15, 'year').toISOString();

  @Output() changeStateEvent = new EventEmitter<string>();

  @Input() formMode = 'ADD';
  @Input() selectedId: any;

  constructor(
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private toaster: ToastrService
  ) {
    console.log(`MAX BIRTHDATE = ${this.maxBirthday}`);
  }

  ngOnInit(): void {
    this.personFormGroup = this.formBuilder.group({
      names: ['', [Validators.required, Validators.minLength(2)]],
      lastNames: ['', [Validators.required, Validators.minLength(2)]],
      idType: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      mobile: [''],
      birthDate: [''],
      picture: [''],
      isUser: {value: false, disabled: true},
      isDriver: {value: false, disabled: true},
    });

    if (this.formMode == 'EDIT' && this.selectedId) {
      //get initialData
      this.peopleService
        .getData(this.selectedId)
        .toPromise()
        .then(res => {
          var response = <HttpResponse<any>>res;
          let personData = <Person>response.body.data[0];
          this.personFormGroup.patchValue(personData);
          this.birthday = personData.birthDate;
          //load images
          if (personData.picture) {
            this.peopleService
              .getPicture(personData.picture)
              .toPromise()
              .then(res => {
                var response = <HttpResponse<any>>res;
                var imgFile = new File([response.body], personData.picture, {
                  type: response.headers.get('Content-Type'),
                });
                this.files.push(imgFile);
              })
              .catch(err => {
                if (err) console.log(err);
              });
          }
        });
    }
  }

  /**
   * Resetea el valor de todos los campos
   */
  onReset() {
    this.personFormGroup.reset();
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
    if (!this.personFormGroup.valid) {
      this.toaster.error('FORMULARIO CON ERRORES!');
      this.personFormGroup.updateValueAndValidity();
      return;
    }

    let data = <Person>this.personFormGroup.value;
    let picture = data.picture;
    delete data._id;
    delete data.picture;

    switch (this.formMode) {
      case 'EDIT':
        this.peopleService
          .updateData(this.selectedId, data)
          .toPromise()
          .then(res => {
            var response = <HttpResponse<any>>res;

            if (response.ok) {
              this.person = <Person>response.body.data;
              //Salvar primero la imagen si esta ha cambiado
              if (this.files.length > 0 && picture !== this.files[0].name) {
                this.peopleService
                  .updatePicture(this.selectedId, this.files[0])
                  .toPromise()
                  .then(res => {
                    var response = <HttpResponse<any>>res;
                    if (response.ok) this.person = <Person>response.body.data;
                    if (response.ok !== true) this.toaster.warning('IMAGEN NO GUARDADA!');
                  })
                  .catch(err => {
                    this.toaster.error(err.error.message);
                  });
              }
              this.toaster.success('ACTUALIZADO!');
              this.changeState('RETRIEVE');
            }
          })
          .catch(err => {
            this.toaster.error(err.error.message);
          });
        break;

      case 'ADD':
        this.peopleService
          .addData(data)
          .toPromise()
          .then(res => {
            var response = <HttpResponse<any>>res;
            if (response.ok) {
              this.newPerson = <Person>response.body.data;

              if (this.files.length > 0) {
                this.peopleService
                  .updatePicture(this.selectedId, this.files[0])
                  .toPromise()
                  .then(res => {
                    var response = <HttpResponse<any>>res;
                    if (response.ok) this.newPerson = <Person>response.body.data;
                    if (response.ok !== true) this.toaster.warning('IMAGEN NO GUARDADA!');
                  })
                  .catch(err => {
                    this.toaster.error(err.error.message);
                  });
              }
            }
            this.toaster.success('AGREGADO!');
            this.changeState('RETRIEVE');
          })
          .catch(err => {
            this.toaster.error(err.error.message);
          });

        break;

      default:
        this.toaster.warning('MODO DE FORMULARIO: ' + this.formMode);
    }
  }

  onSelect(event) {
    console.log(event);
    if (this.files.length > 0) {
      this.files = [];
    }
    this.files.push(...event.addedFiles);
    //this.personFormGroup.get('picture').setValue(this.files[0].name);
  }

  onRemove(event) {
    this.files = [];
    //this.personFormGroup.get('picture').setValue('');
  }
}
