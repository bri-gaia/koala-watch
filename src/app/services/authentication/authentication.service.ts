import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from "../../models/user";
import {APIService} from "../api/api.service";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(
    protected apiService: APIService
  ) {
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  private clearToken() {
    localStorage.removeItem('auth_token');
  }

  public getCurrentUser(): User | null {
    return this.user.value;
  }

  public getCurrentUser$(): Observable<User | null> {
    return this.user$;
  }

  public login(username: string, password: string): Observable<User | null> {
    return this.apiService.getAuthToken(username, password).pipe(
      tap((res: string | null) => {
        if (res)
          this.setToken(res);
        else
          this.clearToken();
      }),
      switchMap((res) => res ? this.apiService.whoAmI() : of(null)),
      tap((user: User | null) => {
        this.user.next(user);
      }),
      switchMap(() => this.user$),
    );
  }

  public logout() {
    this.user.next(null);
    this.clearToken();
  }

}
