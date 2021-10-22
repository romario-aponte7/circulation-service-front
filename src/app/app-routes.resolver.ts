import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main-components/main/main.component";

export const routes: Routes =
    [
      { path: '**', pathMatch: 'full', redirectTo: '/panel' },
        { path: '', pathMatch: 'full', redirectTo: '/panel' },
        { path: 'panel', component: MainComponent },

    ]
    ;

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
