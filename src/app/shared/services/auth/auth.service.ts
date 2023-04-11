import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
const jwtHelper = new JwtHelperService();


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  isLoggedIn() {
    const token = this.getToken();
    console.log('Token Found', token)
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
      .pipe();
  }
  apiCall(): Observable<any> {
    // console.log('<========Token 0Auth wtih (grant_type: password) service called========>');

    return this.http
      .get('https://hub.sensor.buzz/cohort-configuration/api/v1/asset/all')
      .pipe();
  }

  
  getToken() {
    return this.cookieService.get('token');
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  // getToken(name: any) {
  //   var nameEQ = name + "=";
  //   var cookies = document.cookie.split(';');
  //   for (var i = 0; i < cookies.length; i++) {
  //     var cookie = cookies[i];
  //     while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
  //     if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
  //   }
  //   return null;
  //   // return localStorage.getItem('token')
  // }

  // setToken(name: any, value: any, days: any) {
  //   // localStorage.setItem('token',value)
    
  //     var expires = "";
  //     if (days) {
  //       var date = new Date();
  //       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  //       expires = "; expires=" + date.toUTCString();
  //     }
  //     document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  // }

}
