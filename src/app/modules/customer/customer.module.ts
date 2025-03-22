import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { RouterModule } from '@angular/router';
import { TuiButton, TuiDialog, TuiLabel, TuiPopup, TuiRoot, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRepeatTimes } from '@taiga-ui/cdk';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from 'src/app/core/interceptor/error.interceptor';
import { jwtGoogleInterceptor } from 'src/app/core/interceptor/jwt-google.interceptor';
import { jwtInterceptor } from 'src/app/core/interceptor/jwt.interceptor';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    FormsModule,
    RouterModule,
    TuiDrawer,
    TuiPopup,
    TuiButton,
    TuiLabel,
    TuiTitle,
    TuiTextfield as any,
    TuiPopup,
    TuiRoot,
    TuiDialog,
    TuiRepeatTimes,
    DatePipe,
    NzModalModule,
    NzMessageModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTimePickerModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor, jwtGoogleInterceptor])),
    { provide: NZ_I18N, useValue: vi_VN },
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerModule {}
