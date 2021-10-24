import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
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

  constructor(
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    public carService: CarService) { }

  ngOnInit(): void {
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
    this.carService.getInfoCar(this.form.value.licensePlate.toUpperCase(), this.form.value.date).subscribe((res: any) => {

    }, (error) => {

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
      // this.dataProvider.isDisabledScreen = false;
    });
  }


}
