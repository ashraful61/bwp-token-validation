import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilitiesService } from '../../services/utilities/utilities.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private utilitiesService: UtilitiesService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.utilitiesService.showSpinner(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.utilitiesService.showSpinner(false);
      })
    );
  }
}
