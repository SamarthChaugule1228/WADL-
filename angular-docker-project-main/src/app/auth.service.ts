import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  setUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}