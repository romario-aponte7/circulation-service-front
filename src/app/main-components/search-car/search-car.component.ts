import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2';
import { NewCarComponent } from '../new-car/new-car.component';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  public ref: any;
  cars: Car[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    public carService: CarService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadCard();
    this.form = this.formBuilder.group(
      {
        licensePlate: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        date: ['', [Validators.required,]],

      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const format = 'yyyy-MM-dd hh:mm:ss';
    const locale = 'en-US';
    const date = formatDate(this.form.value.date, format, locale)
    const car = this.cars.find(car => car.licensePlate === this.form.value.licensePlate);
    if (!car) {
      this.showError('No se encontro el vehículo');
      return;
    }
    this.carService.getInfoCar(car.carId || '', date).subscribe((res: any) => {

      Swal.fire({
        text: 'EL vehiculo ' + res.licensePlate + ' ' + res.message,
        icon: 'success'
      })

    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
      })
    });


  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  date(e: any) {
    if (!e) {
      return;
    }
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    // this.form.get('date').setValue(convertDate, {
    //   onlyself: true
    // })
  }
  AddNew() {
    this.ref = this.dialogService.open(NewCarComponent, {
      header: 'AGREGAR VEHÍCULO ',
      closeOnEscape: true,
      closable: true,
      width: '700px',
      height: '500px'
      // data: { user: this.currentPerson.user, isAdmin: false },
    });
    this.ref.onClose.subscribe((res: boolean) => {
      this.loadCard();
    });
  }
  loadCard() {
    this.carService.loadCars().subscribe((res: any) => {
      this.cars = res;
    }, (error) => {

    });
  }
  showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
  }
  showSuccess(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: detail });
  }

}
