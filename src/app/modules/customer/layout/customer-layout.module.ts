import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLayoutComponent } from './customer-layout.component';
import { CustomerLayoutRoutingModule } from './customer-layout-routing.module';
import { RouterModule } from '@angular/router';
import { CustomerSidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiRepeatTimes } from '@taiga-ui/cdk';
import { TuiButton, TuiDialog, TuiLabel, TuiPopup, TuiRoot, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { CustomerSidebarSubmenuComponent } from './sidebar-submenu/sidebar-submenu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [CustomerLayoutComponent, CustomerSidebarComponent, CustomerSidebarSubmenuComponent, NavbarComponent],
  imports: [
    CommonModule,
    CustomerLayoutRoutingModule,
    RouterModule,
    TuiDrawer,
    TuiPopup,
    TuiButton,
    TuiLabel,
    TuiTitle,
    TuiTextfield as any,
    ReactiveFormsModule,
    TuiPopup,
    TuiRoot,
    TuiDialog,
    TuiRepeatTimes,
    AngularSvgIconModule.forRoot()
  ],
})
export class CustomerLayoutModule {}
