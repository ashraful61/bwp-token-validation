import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UtilitiesService } from '../../services/utilities/utilities.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private jwtHelper = new JwtHelperService();
  constructor(
    private authService: AuthService,
    private router: Router,
    private utilitiesService: UtilitiesService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    console.log('Token Interceptor fired');
    const authToken = this.authService.getToken();
    if (authToken) {
      try {
        //Token expiration check, isExpired true means if token is expired
        const isExpired = this.jwtHelper.isTokenExpired(authToken);

        if (isExpired) {
          this.authService.logout();
          this.router.navigateByUrl('/auth');
          return;
        } else {
          return this.responseHandler(
            this.requestCloneHandler(request, authToken),
            next
          );
        }
      } catch (error) {
        this.authService.logout();
        return;
      }
    } else {
      return this.responseHandler(request, next);
    }
  }

  //Loading spinner, http response handler
  private responseHandler = (
    request: HttpRequest<unknown>,
    next: HttpHandler
  ) => {
    const startedTime = Date.now();
    let responseType: string;
    return next.handle(request).pipe(
      map((x) => {
        this.utilitiesService.showSpinner(true);
        return x;
      }),
      tap({
        next: (event) => {
          responseType = event instanceof HttpResponse ? 'succeeded' : '';
        },
        error: (error) => {
          responseType = 'failed';
        },
      }),
      this.handlerError(),
      finalize(() => {
        this.utilitiesService.showSpinner(false);
        const elapsedTime = Date.now() - startedTime;
        const msg = `${request.method} "${request.urlWithParams}" ${responseType} in ${elapsedTime} ms.`;
        console.log(msg);
      })
    );
  };

  //Error handler
  private handlerError(): <T>(source: Observable<T>) => Observable<T> {
    return <T>(source: Observable<T>) =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          this.utilitiesService.showSpinner(false);
          this.utilitiesService.errorResponseHandler(error as any);
          return throwError(() => error);
        })
      );
  }

  //Set headers for every request
  private requestCloneHandler = (
    request: HttpRequest<unknown>,
    authToken: string
  ) => {
    let contentType;
    if (request.body instanceof FormData) {
      contentType = 'multipart/form-data';
    } else {
      contentType = 'application/json';
    }

    return request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', contentType),
    });
  };
}
