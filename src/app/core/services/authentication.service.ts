import { RegisterRequest } from 'src/app/modules/uikit/pages/table/model/request/register-request';
import { RegisterResponse } from 'src/app/modules/uikit/pages/table/model/responses/register-response';
import { VerifyOtpRequest } from 'src/app/modules/uikit/pages/table/model/request/verify-otp-request';
import { VerifyOtpResponse } from 'src/app/modules/uikit/pages/table/model/responses/verify-otp-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { catchError, delay, map, retryWhen, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from 'src/app/modules/uikit/pages/table/model/responses/login-response';
import { Users } from 'src/app/modules/uikit/pages/table/model/users.model';
import { ExternalAuthRequest } from 'src/app/modules/uikit/pages/table/model/requests/external-auth-request';
import { ExternalAuthResponse } from 'src/app/modules/uikit/pages/table/model/responses/external-auth-response';
import { SetPasswordRequest } from 'src/app/modules/uikit/pages/table/model/requests/set-password-request';
import { SetForgotPasswordRequest } from '../models/set-forgot-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<Users | null>;
  public user: Observable<Users | null>;
  private refreshTokenTimeout: any;
  private refreshingInProgress: boolean = false;
  private refreshTokenSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<Users | null>(this.getUserFromStorage());
    this.user = this.userSubject.asObservable();

    this.checkInitialTokenRefresh();
  }

  public get currentUserValue(): Users | null {
    return this.userSubject.value;
  }

  public get isAuthenticated(): boolean {
    const user = this.currentUserValue;
    if (!user) return false;

    const decodedToken: any = jwtDecode(user.token);
    const tokenExp = decodedToken.exp * 1000;
    return Date.now() < tokenExp;
  }

  public get isTokenExpired(): boolean {
    const user = this.currentUserValue;
    if (!user?.token) return true;

    try {
      const decodedToken: any = jwtDecode(user.token);
      return decodedToken.exp * 1000 < Date.now() + 10000;
    } catch {
      return true;
    }
  }

  public get isTokenExpiringSoon(): boolean {
    const user = this.currentUserValue;
    if (!user?.token) return true;

    try {
      const decodedToken: any = jwtDecode(user.token);
      return decodedToken.exp * 1000 - Date.now() < 30000;
    } catch {
      return true;
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.BACKEND_API_URL}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          if (response.isSucceed) {
            const user: Users = {
              email: response.email,
              userId: response.userId,
              token: response.token,
              refreshToken: response.refreshToken,
              role: response.role,
              isActived: true,
              expiration: response.expiration,
            };

            this.storeUserData(user);
            this.startRefreshTokenTimer();
          }
          return response;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => new Error(error.error?.message || 'Login failed'));
        }),
      );
  }

  refreshToken(): Observable<LoginResponse> {
    if (this.refreshingInProgress) {
      return new Observable((observer) => {
        this.refreshTokenSubject.subscribe((token) => {
          observer.next(token);
          observer.complete();
        });
      });
    }

    this.refreshingInProgress = true;
    const user = this.currentUserValue;

    if (!user?.refreshToken) {
      console.error('No refresh token found');
      this.logOut(false);
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http
      .post<LoginResponse>(`${environment.BACKEND_API_URL}/api/auth/token`, {
        accessToken: user.token,
        refreshToken: user.refreshToken,
      })
      .pipe(
        switchMap((response) => {
          this.refreshingInProgress = false;
          if (response.isSucceed) {
            const updatedUser = {
              ...user,
              token: response.token,
              refreshToken: response.refreshToken,
              expiration: response.expiration,
            };
            this.storeUserData(updatedUser);
            this.refreshTokenSubject.next(response);
            this.startRefreshTokenTimer();
            return of(response);
          }
          this.logOut(false);
          return throwError(() => new Error('Token refresh failed'));
        }),
        retryWhen((errors) => errors.pipe(delay(1000), take(3))),
        catchError((error) => {
          this.refreshingInProgress = false;
          this.logOut(false);
          return throwError(() => error);
        }),
      );
  }

  private checkInitialTokenRefresh(): void {
    if (this.isTokenExpired) {
      this.refreshToken().subscribe({
        next: () => console.log('Token refreshed on app load'),
        error: (error) => {
          console.error('Token refresh failed on app load:', error);
          this.logOut(false);
        },
      });
    } else if (this.isTokenExpiringSoon) {
      this.refreshToken().subscribe({
        next: () => console.log('Token refreshed proactively on app load'),
        error: (error) => {
          console.error('Proactive token refresh failed:', error);
          this.startRefreshTokenTimer();
        },
      });
    } else {
      this.startRefreshTokenTimer();
    }
  }

  private startRefreshTokenTimer(): void {
    this.stopRefreshTokenTimer();

    if (this.isTokenExpired) {
      this.refreshToken().subscribe({
        next: () => console.log('Token refreshed successfully'),
        error: (error) => {
          console.error('Token refresh failed:', error);
          this.logOut();
        },
      });
      return;
    }

    const user = this.currentUserValue;
    if (!user?.token) return;

    try {
      const jwtToken: any = jwtDecode(user.token);
      const expires = new Date(jwtToken.exp * 1000);
      if (this.isTokenExpiringSoon) {
        this.refreshToken().subscribe({
          next: () => console.log('Token refreshed successfully'),
          error: (error) => {
            console.error('Token refresh failed:', error);
            const remainingTime = expires.getTime() - Date.now() - 5000;
            if (remainingTime > 0) {
              this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), remainingTime);
            }
          },
        });
        return;
      }

      const timeUntilExpiry = expires.getTime() - Date.now();
      const refreshTime = Math.max(0, timeUntilExpiry - 60000);

      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe({
          next: () => console.log('Token refreshed successfully via timer'),
          error: (error) => {
            console.error('Timer token refresh failed:', error);
            const newRefreshTime = Math.max(0, (expires.getTime() - Date.now()) / 2);
            if (newRefreshTime > 5000) {
              this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), newRefreshTime);
            }
          },
        });
      }, refreshTime);
    } catch (error) {
      console.error('Error starting refresh timer:', error);
      this.logOut();
    }
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  private getUserFromStorage(): Users | null {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    try {
      const user: Users = JSON.parse(storedUser);
      if (!user.token || !user.refreshToken) return null; // Add null check

      // Check token expiration
      const decodedToken: any = jwtDecode(user.token);
      const tokenExp = decodedToken.exp * 1000;
      if (Date.now() >= tokenExp) {
        return user; // Return the user, to allow refresh on the next step
      }

      return user;
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      localStorage.removeItem('user');
      return null;
    }
  }

  private getClaimFromToken(token: string, claimKey: string): string {
    try {
      const decodedToken: any = jwtDecode(token);
      switch (claimKey) {
        case 'role':
          return decodedToken.r || '';
        case 'userId':
          return decodedToken.uid || '';
        default:
          return decodedToken[claimKey] || '';
      }
    } catch {
      return '';
    }
  }

  private storeUserData(user: Users): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logOut(redirectToSignIn: boolean = false): void {
    this.stopRefreshTokenTimer();
    localStorage.removeItem('user');
    localStorage.removeItem('tempToken');
    this.userSubject.next(null);

    if (redirectToSignIn) {
      this.router.navigate(['/auth/sign-in']);
    } else {
      this.router.navigate(['/']);
    }
  }

  public getEmailFromToken(): string | null {
    const user = this.currentUserValue;
    if (!user?.token) return null;
    return this.getClaimFromToken(user.token, 'email');
  }

  public getRoleFromToken(): string | null {
    const user = this.currentUserValue;
    if (!user?.token) return null;
    try {
      const decodedToken: any = jwtDecode(user.token);
      const role = (decodedToken.r || decodedToken.role || '').toUpperCase();
      return role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  register(model: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.BACKEND_API_URL}/api/auth/register`, model).pipe(
      map((response) => {
        console.log('Register response:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Register error:', error);
        return throwError(() => new Error(error.error?.message || 'Register failed'));
      }),
    );
  }
  // Hàm verify OTP mới
  verifyOtp(model: VerifyOtpRequest): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${environment.BACKEND_API_URL}/api/auth/otp`, model).pipe(
      map((response) => {
        console.log('Verify OTP response:', response);
        // { message: "OTP verified successfully. Your account is now active." }
        return response;
      }),
      catchError((error) => {
        console.error('Verify OTP error:', error);
        // Backend trả về code 400 kèm { message: "Invalid or expired OTP." }
        return throwError(() => new Error(error.error?.message || 'Verify OTP failed'));
      }),
    );
  }

  googleLogin(authRequest: ExternalAuthRequest): Observable<ExternalAuthResponse> {
    return this.http.post<ExternalAuthResponse>(`${environment.BACKEND_API_URL}/api/auth/google`, authRequest).pipe(
      map((response) => {
        if (response.isSucceed) {
          const user: Users = {
            email: response.email || '',
            userId: response.userId,
            token: response.token || '',
            refreshToken: response.refreshToken || '',
            role: response.role,
            expiration: new Date(),
          };

          this.storeUserData(user);
          this.startRefreshTokenTimer();
        }
        return response;
      }),
      catchError((error) => {
        console.error('Google login error:', error);
        return throwError(() => new Error(error.error?.message || 'Google login failed'));
      }),
    );
  }

  setPassword(authRequest: SetPasswordRequest): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_API_URL}/api/auth/password`, authRequest);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_API_URL}/api/auth/forgot-password`, { email });
  }

  verifyForgotPasswordOtp(email: string, otp: string): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_API_URL}/api/auth/forgot-password/otp`, { email, otp });
  }

  resetForgotPassword(request: SetForgotPasswordRequest): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_API_URL}/api/auth/forgot-password/reset`, request);
  }
}
