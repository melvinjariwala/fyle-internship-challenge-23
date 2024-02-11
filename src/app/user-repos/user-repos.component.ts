import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'],
})
export class UserReposComponent implements OnInit {
  @ViewChild('reposContainer') reposContainer: ElementRef | undefined;
  user: any;
  repositories: any[] = [];
  errorMessage: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    if (this.apiService.user) {
      this.user = this.apiService.user;
      this.totalItems = this.user.public_repos;
    } else {
      this.router.navigate(['']);
    }
  }

  fetchRepositories() {
    this.isLoading = true;
    this.apiService
      .getUserRepositories(this.user.login, this.currentPage, this.pageSize)
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

    this.fetchRepositories();
    this.scrollToTop();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.fetchRepositories();
  }

  scrollToTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.fetchRepositories();
  }
}
