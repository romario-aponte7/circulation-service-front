import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getInfoCar(plate: string, date: string) {
    return this.http.get('environment' + '/getInfoCar?plate=' + plate + 'date=' + date);
  }
  saveNewCar(car: Car) {
    return this.http.get('environment' + '/getInfoCar?car=' + car);
  }
}
