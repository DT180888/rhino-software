import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { HomeHeaderComponent } from './modules/home-page/home-header/home-header.component';
import { HomeFooterComponent } from './modules/home-page/home-footer/home-footer.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
  ],
  providers: [],
})
export class AppModule { }
