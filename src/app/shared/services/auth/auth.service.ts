import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isLoggedIn() {
    const token = this.cookieService.get('token');
    if (token) {
      return true;
      // try {
      //   if (jwtHelper.isTokenExpired(token)) {
      //     // true means token expired.
      //    this.cookieService.deleteAll();
      //     return false;
      //   } else {
      //     return true;
      //   }
      // } catch (error) {
      //   this.logout();
      //   return false;
      // }
    } else {
      return false;
    }
  }

  logout() {
    this.cookieService.deleteAll();
    return true;
  }

  // signIn(username: string, password: string): Observable<any> {
  //   // console.log('<========Token 0Auth wtih (grant_type: password) service called========>');
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   const body = JSON.stringify({ email: username, password });
  //   return this.http
  //     .post(this.globalService.apiURL_UPGAuth + '/account/login', body, {
  //       headers,
  //     })
  //     .pipe(
  //       map((x: Response) => x),
  //       map((x: any) => x.result),
  //       map((x) => {
  //         // this.setSessionUser(x.access_token); //// open this later
  //         // this.setToken(x.access_token); //// open this later

  //         // localStorage.setItem('token', JSON.stringify(x.access_token));
  //         return x;
  //       }),
  //       catchError((error: Response) => {
  //         return throwError(error);
  //       })
  //     );
  // }

  getToken() {
    return this.cookieService.get('token');
  }

  setToken(token: string) {
    this.cookieService.set('token', JSON.stringify(token));
  }
}
