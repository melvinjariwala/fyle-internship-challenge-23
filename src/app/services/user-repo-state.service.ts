import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepoStateService {
  private userReposSubject = new BehaviorSubject<any[]>([]);
  userRepos$ = this.userReposSubject.asObservable();

  constructor() {}

  getUserRepos(): Observable<any[]> {
    const storedRepos = localStorage.getItem('userRepos');
    const repos = storedRepos ? JSON.parse(storedRepos) : [];
    this.userReposSubject.next(repos);
    return this.userReposSubject.asObservable();
  }

  setUserRepos(repos: any[]): void {
    this.userReposSubject.next(repos);
    localStorage.setItem('userRepos', JSON.stringify(repos));
  }
}
