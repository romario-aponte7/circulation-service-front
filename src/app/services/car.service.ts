import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { DayCirculation } from '../models/day.circulation';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getInfoCar(carId: string, date: string) {
    
    return this.http.get(environment.api + 'getCarById?carId=' + carId + '&date=' + date);
  }
  saveNewCar(car: Car) {
    return this.http.post(environment.api + 'saveNewCar', car);
  }
  loadCars() {
    return this.http.get(environment.api + 'loadCars');
  }
  saveConfigCar(car: DayCirculation[]) {
    return this.http.post(environment.api + 'saveDaysConfig', car);
  }
}
