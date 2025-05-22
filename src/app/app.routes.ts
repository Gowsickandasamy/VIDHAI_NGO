import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VolunteesComponent } from './components/voluntees/voluntees.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'voluntees', component:VolunteesComponent},
];
