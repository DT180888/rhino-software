import { TuiRoot } from '@taiga-ui/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { jwtInterceptor } from './core/interceptor/jwt.interceptor';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { AuthenticationService } from './core/services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { jwtGoogleInterceptor } from './core/interceptor/jwt-google.interceptor';
registerLocaleData(localeVi, 'vi-VN');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgClass,
    ResponsiveHelperComponent,
    NgxSonnerToaster,
    RouterOutlet,
    TuiRoot
  ],
  providers: [
    ThemeService,
    AuthenticationService,
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor, jwtGoogleInterceptor])
    ),
    { provide: localeVi, useValue: 'vi-VN' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
