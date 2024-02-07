import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  user: any;
  repositories: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.user = this.apiService.user;
  }

  fetchRepositories() {
    console.log(this.user.login);
    this.apiService
      .getUserRepositories(this.user.login)
      .subscribe((repos: any) => {
        this.repositories = repos;
        console.log('this.repositories : ', this.repositories);
      });
  }

  ngOnInit(): void {
    this.fetchRepositories();
  }
}
