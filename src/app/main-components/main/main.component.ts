import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  navLinks: any[] = [];
  activeLinkIndex = -1;



  constructor(
    private router: Router
  ) {
    this.navLinks = [
      {
        label: 'Información',
        link: './info',
        index: 0,
        visible: true
      },
      {
        label: 'Consulta',
        link: './search',
        index: 1,
        visible: true
      },
      {
        label: 'Configuracion de circulación',
        link: './config',
        index: 2,
        visible: true
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
