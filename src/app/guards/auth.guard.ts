import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return true;
  // }

  canActivate(route: any): any {
    // console.log(route);
    if (
      route.routeConfig.path === 'login' ||
      route.routeConfig.path === 'signup'
    ) {
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl('/dashboard');
      } else {
        console.log('vv')
        return true;
      }
    } else {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigateByUrl('/auth');
        return false;
      }
    }
  }
}
