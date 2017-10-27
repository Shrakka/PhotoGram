import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotoCreationComponent } from './photo-creation/photo-creation.component';
import { NotFoundComponent} from './not-found/not-found.component';


export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'photo/:id', component: PhotoDetailComponent},
  { path: 'upload', component: PhotoCreationComponent},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];
