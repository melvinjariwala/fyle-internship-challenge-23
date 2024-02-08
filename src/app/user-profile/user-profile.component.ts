import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: any;
  repositories: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
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
