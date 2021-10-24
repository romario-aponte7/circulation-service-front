import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        licensePlate: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        enrollmentDate: ['', [Validators.required,]],
        brand: ['', [Validators.required]],
        type: ['', [Validators.required]],
        color: ['', [Validators.required]],
        country: ['', [Validators.required]],
        motor: ['', [Validators.required]],
        chassis: ['', [Validators.required]],
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
      country: this.form.value.country,
      motor: this.form.value.motor,
      chassis: this.form.value.chassis,
    }
    this.carService.saveNewCar(newCar).subscribe((res: any) => {

    }, (error) => {

    })

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
