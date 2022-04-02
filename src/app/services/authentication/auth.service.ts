import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthorized = false;
  public role = '';
  private baseUrl = 'https://api.wirelabs.at/auth/';

  private madRequest: Promise<boolean>;
  private madeRequestStatic: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.madRequest = new Promise((res, rej) => {
      http
        .get(this.baseUrl + 'is-authenticated')
        .pipe(take(1))
        .subscribe((auth) => {
          // @ts-ignore
          if (auth.data) {
            this.isAuthorized = true;
            this.madeRequestStatic = true;
            res(true);
          } else {
            this.isAuthorized = false;
            this.madeRequestStatic = true;
            res(false);
          }
        });
    });
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'login', {
      email,
      password,
    });
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(this.baseUrl + 'forgot-password', { email: email });
  }

  public resetPassword(url: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'reset-password', { url: url, password: password});
  }

  public logout(): void {
    this.isAuthorized = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public refreshRole(): void {
    this.http.get(this.baseUrl + 'get-role').pipe(take(1)).subscribe(result => {
      // @ts-ignore
      if(result.data) {
        // @ts-ignore
        this.role = result.data.role;
      }
    });
  }

  public checkAuthenticated(): Observable<any> {
    return this.http.get(this.baseUrl + 'is-authenticated');
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.madeRequestStatic) {
      return new Promise((res, rej) => {
        res(this.isAuthorized);
      });
    } else {
      return new Promise((res, rej) => {
        this.madRequest.then((data) => {
          res(this.isAuthorized);
        });
      });
    }
  }
}
