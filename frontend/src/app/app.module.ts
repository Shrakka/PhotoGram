import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotoCreationComponent } from './photo-creation/photo-creation.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PhotoService } from './photo.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhotoDetailComponent,
    PhotoCreationComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
