import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInKey = 'isLoggedIn';

  constructor() {}

  public setLoggedIn(value: boolean) {
    localStorage.setItem(this.loggedInKey, value ? 'true' : 'false');
  }

  public isLoggedInUser() {
    const isLoggedIn = localStorage.getItem(this.loggedInKey);
    return isLoggedIn === 'true';
  }

  public logout() {
    localStorage.removeItem(this.loggedInKey);
  }
}
