import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const path = state.url;

    if (path === '/admin' && !this.authService.isLoggedInUser()) {
      return this.router.parseUrl('/login');
    }
    if (path === '/login' && this.authService.isLoggedInUser()) {
      this.router.navigate(['/job-list']);
      return false;
    } else {
      return true;
    }
  }
}
