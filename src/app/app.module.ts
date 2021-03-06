import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app-routes.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main-components/main/main.component';
import { NewCarComponent } from './main-components/new-car/new-car.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './main-components/app-material/app-material.module';
import { InfoCarComponent } from './main-components/info-car/info-car.component';
import { SearchCarComponent } from './main-components/search-car/search-car.component';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { ConfigCarComponent } from './main-components/config-car/config-car.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewCarComponent,
    InfoCarComponent,
    SearchCarComponent,
    ConfigCarComponent
  ],
  imports: [
    AppRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastModule    
  ],
  providers: [
    DialogService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
