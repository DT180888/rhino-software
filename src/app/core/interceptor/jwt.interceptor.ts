import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

export function jwtInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthenticationService);

  // add auth header with jwt if user is logged in and request is to the api url
  const user = authService.currentUserValue;
  const isApiUrl = request.url.startsWith(environment.BACKEND_API_URL);
  const token = user?.token;

  if (isApiUrl) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request);
}

