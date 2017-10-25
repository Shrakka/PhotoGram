import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotoCreationComponent } from './photo-creation/photo-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhotoDetailComponent,
    PhotoCreationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
