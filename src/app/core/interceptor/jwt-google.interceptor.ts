import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export function jwtGoogleInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const googleToken = localStorage.getItem('tempToken');
  const isApiUrl = request.url.startsWith(environment.BACKEND_API_URL);

  if (isApiUrl && googleToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${googleToken}`,
      },
    });
  }

  return next(request);
}
