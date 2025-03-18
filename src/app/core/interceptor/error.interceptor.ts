import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export function errorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        return throwError(() => new Error('Unable to connect to the server. Please check your internet connection.'));
      }

      if ([401, 403].includes(error.status)) {
        localStorage.removeItem('user');
        void router.navigate(['/']);
      }

      if (error.status === 400 && error.error?.errors) {
        // Convert validation errors to a more usable format
        const errorMessages = Object.values(error.error.errors)
          .flat()
          .filter((message) => typeof message === 'string');

        if (errorMessages.length > 0) {
          return throwError(() => ({
            message: errorMessages[0],
            validationErrors: error.error.errors,
          }));
        }
      }

      const errorMessage = error.error?.message || error.statusText;
      return throwError(() => new Error(errorMessage));
    }),
  );
}