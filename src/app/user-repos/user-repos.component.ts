import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UserStateService } from '../services/user-state.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'],
})
export class UserReposComponent implements OnInit, OnDestroy {
  @ViewChild('reposContainer') reposContainer: ElementRef | undefined;
  user: any;
  repositories: any[] = [];
  errorMessage: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userStateService: UserStateService
  ) {}

  fetchRepositories(username: any) {
    this.isLoading = true;
    this.apiService
      .getUserRepositories(username, this.currentPage, this.pageSize)
      .subscribe({
        next: (value: any) => {
          this.repositories = value;
          this.apiService.repos = this.repositories;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.repositories = [];
          this.errorMessage = 'Error fetch repositories!';
          console.log('API error : ', err);
          this.router.navigate(['']);
        },
        complete: () => {
          this.isLoading = false;
          console.log('Repositories fetched!');
        },
      });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;

    this.fetchRepositories(this.user.login);
    this.scrollToTop();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.fetchRepositories(this.user.login);
  }

  scrollToTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    // this.userStateService.getUser().subscribe((user) => {
    //   this.user = user;
    //   this.totalItems = this.user.public_repos;
    //   this.currentPage = 1;
    //   this.fetchRepositories(this.user.login);
    // });
    this.userStateService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
        (this.totalItems = this.user.public_repos), (this.currentPage = 1);
        this.fetchRepositories(this.user.login);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
