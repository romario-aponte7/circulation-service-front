import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigCarComponent } from "./main-components/config-car/config-car.component";
import { InfoCarComponent } from "./main-components/info-car/info-car.component";
import { MainComponent } from "./main-components/main/main.component";
import { SearchCarComponent } from "./main-components/search-car/search-car.component";

const routes: Routes = [
  { path: '', redirectTo: '/panel/info', pathMatch: 'full' },
  {
    path: 'panel', component: MainComponent,
    children: [

      { path: 'info', component: InfoCarComponent },
      { path: 'search', component: SearchCarComponent },
      { path: 'config', component: ConfigCarComponent }]
  },

];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
