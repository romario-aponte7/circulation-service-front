import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app-routes.resolver';

import { AppComponent } from './app.component';
import { MainComponent } from './main-components/main/main.component';
import { NewCarComponent } from './main-components/new-car/new-car.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewCarComponent
  ],
  imports: [
    AppRoutes,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
