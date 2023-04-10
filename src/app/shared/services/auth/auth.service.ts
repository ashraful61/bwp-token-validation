import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
  ) {}

  isLoggedIn() {
    const token = this.cookieService.get('BWToken');
    if (token) {
      try {
        if (jwtHelper.isTokenExpired(token)) {
          // true means token expired.
          this.logout();
          this.router.navigateByUrl('/auth');
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.log(error);
        this.logout();
        this.router.navigateByUrl('/auth');
        return false;
      }
    } else {
      return false;
    }
  }

  logout() {
    this.cookieService.deleteAll();
    return true;
  }

  signIn(username: string, password: string): Observable<any> {
    // console.log('<========Token 0Auth wtih (grant_type: password) service called========>');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ email: username, password });
    return this.http
      .post(environment.apiURL + '/account/login', body, {
        headers,
      })
      .pipe(
        map((x: any) => x.result),
        map((x) => x),
        catchError((error: Response) => {
          return throwError(() => error);
        })
      );
  }

  getToken() {
    return this.cookieService.get('BWToken');
  }

  setToken(token: string) {
    this.cookieService.set('BWToken', JSON.stringify(token));
  }
}
