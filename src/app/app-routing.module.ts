import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () => import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'my-organization',
    loadChildren: () => import('./modules/customer/layout/customer-layout.module').then((m) => m.CustomerLayoutModule),
    canActivate: [AuthGuard],
    data: { role: 'CUSTOMER' },
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [RouterModule],
})
export class AppRoutingModule {}
