import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { User } from './../interfaces/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService implements OnDestroy {
  subscribe$!: Subscription;

  constructor(private http: HttpClient, private router: Router) { }

  check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, credentials).pipe(
      tap(data => {
        localStorage.setItem('token', data.access_token);
        this.setUser();
      }),
      take(1));
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user`, user).pipe(take(1));
  }

  password(credentials: { email: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/password/email`, credentials).pipe(take(1));
  }

  passwordReset(credentials: { token: string, email: string, password: string, password_confirmation: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/password/reset`, credentials).pipe(take(1));
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    // this.http.get(`${environment.apiUrl}/logout`).subscribe(() => {});
  }

  getUser() {
    return this.http.get<User>(`${environment.apiUrl}/user`)
      .pipe(take(1));
  }

  getLocalUser(): User {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
  }

  async setUser(): Promise<boolean> {
    this.subscribe$ = this.getUser().subscribe(
      {
        next: data => {
         localStorage.setItem('user', JSON.stringify(data));
          setTimeout(() => {
            this.redirect();
          }, 100);
          return true;
        }
      }
    );
    return false;
  }

  ngOnDestroy(): void {
    this.subscribe$.unsubscribe();
  }

  redirect() {
    this.router.navigate(['/dashboard']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

}
