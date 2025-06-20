import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VolunteesComponent } from './components/voluntees/voluntees.component';
import { DonateComponent } from './components/donate/donate.component';
import { GalleryComponent } from './components/gallery/gallery.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'voluntees', component:VolunteesComponent},
    {path:'donate', component:DonateComponent},
    {path:'gallery', component:GalleryComponent},
];

