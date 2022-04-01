import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const promise = this.auth.isAuthenticated();
    promise.then((auth) => {
      if (!auth) {
        this.router.navigate(['login']);
      }

      if (state.url === '/login' && auth) {
        this.router.navigate(['/hub-overview']);
      }
    });
    return promise;
  }
}
