import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    
  }

}
