import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private authService: AuthenticationService) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const authService = this.authService;

    if (!authService.currentUserValue) {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }

    if (authService.isTokenExpired) {
      return authService.refreshToken().pipe(
        map(() => {
          return true;
        }),
        catchError(() => {
          this.router.navigate(['/auth/sign-in']);
          return of(false);
        })
      );
    }

    return true;
  }
}