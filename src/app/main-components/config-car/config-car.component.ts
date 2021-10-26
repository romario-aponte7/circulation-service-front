import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DayCirculation } from 'src/app/models/day.circulation';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-config-car',
  templateUrl: './config-car.component.html',
  styleUrls: ['./config-car.component.css']
})
export class ConfigCarComponent implements OnInit {
  dayNumbers: any[] = [
    { value: 0, viewValue: 0 },
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
  ];
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        lunes: ['', Validators.required],
        martes: ['', Validators.required],
        miercoles: ['', Validators.required],
        jueves: ['', Validators.required],
        viernes: ['', Validators.required],
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
    const dayCirculation: DayCirculation[] = [];
    if (this.form.value.lunes) {
      const day: DayCirculation = {
        day: 'lunes',
        numbers: this.form.value.lunes
      }
      dayCirculation.push(day);
    }
    if (this.form.value.martes) {
      const day: DayCirculation = {
        day: 'martes',
        numbers: this.form.value.martes
      }
      dayCirculation.push(day);
    }
    if (this.form.value.miercoles) {
      const day: DayCirculation = {
        day: 'miercoles',
        numbers: this.form.value.miercoles
      }
      dayCirculation.push(day);
    }
    if (this.form.value.jueves) {
      const day: DayCirculation = {
        day: 'jueves',
        numbers: this.form.value.jueves
      }
      dayCirculation.push(day);
    }
    if (this.form.value.viernes) {
      const day: DayCirculation = {
        day: 'viernes',
        numbers: this.form.value.viernes
      }
      dayCirculation.push(day);
    }

    this.carService.saveConfigCar(dayCirculation).subscribe((res: any) => {
      this.form.reset();
      this.showSuccess('Guardado exitóso')
    }, (error) => {
      this.showError('Error al guardar')

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
