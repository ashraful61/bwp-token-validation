import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    console.log('Token Interceptor fired');
    const authToken = this.authService.getToken();
    if (authToken) {
      try {
        //Token expiration check, isExpired true if token is expired
        const isExpired = this.jwtHelper.isTokenExpired(authToken);

        if (isExpired) {
          this.authService.logout();
          this.router.navigateByUrl('/auth');
          return;
        } else {
          //Set headers for every request
          const authRequest = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${authToken}`
            ),
          });
          return next.handle(authRequest);
        }
      } catch (error) {
        this.authService.logout();
        return;
      }
    } else {
      return next.handle(request);
    }
  }
}
