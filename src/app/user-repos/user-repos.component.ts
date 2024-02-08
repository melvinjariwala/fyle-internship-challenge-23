import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'],
})
export class UserReposComponent implements OnInit {
  user: any;
  repositories: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {
    this.user = this.apiService.user;
  }

  fetchRepositories() {
    this.apiService.getUserRepositories(this.user.login, 1, 10).subscribe({
      next: (value: any) => {
        this.repositories = value;
        this.apiService.repos = this.repositories;
      },
      error: (err) => {
        this.repositories = [];
        this.errorMessage = 'Error fetch repositories!';
        console.log('API error : ', err);
      },
      complete: () => {
        console.log('Repositories fetched!');
      },
    });
  }

  ngOnInit(): void {
    this.fetchRepositories();
  }
}
