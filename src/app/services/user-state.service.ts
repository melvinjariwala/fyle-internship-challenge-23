import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  constructor() {}

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  setUser(user: any): void {
    this.userSubject.next(user);
  }
}
