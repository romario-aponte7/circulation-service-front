import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private dynamicDialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        licensePlate: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        enrollmentDate: ['', [Validators.required],],
        brand: ['', [Validators.required],],
        type: ['', [Validators.required],],
        color: ['', [Validators.required],],
        country: ['', [Validators.required],],
        motor: ['', [Validators.required],],
        chassis: ['', [Validators.required],],
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

    const newCar: Car = {
      licensePlate: this.form.value.licensePlate.toUpperCase(),
      enrollmentDate: this.form.value.enrollmentDate,
      brand: this.form.value.brand,
      type: this.form.value.type,
      color: this.form.value.color,
      originCountry: this.form.value.country,
      motor: this.form.value.motor,
      chassis: this.form.value.chassis,
    }
    this.carService.saveNewCar(newCar).subscribe((res: any) => {
      const car: Car = res;
      this.showSuccess('Vehículo ' + car.licensePlate + 'guardado con éxito');
      this.dynamicDialogRef.close()

    }, (error: HttpErrorResponse) => {
      this.showSuccess('Error al guardar vehículo');
    })

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  showSuccess(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: detail });
  }

  showInfo(detail: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: detail });
  }

  showWarn(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: detail });
  }

  showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
  }

}
