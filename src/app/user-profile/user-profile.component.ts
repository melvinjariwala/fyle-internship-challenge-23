import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(
    public router: Router,
    private apiService: ApiService,
    private userStateService: UserStateService
  ) {}

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  searchUser(username: string): void {
    console.log('From user-profile username: ', username);
    if (username) {
      this.isLoading = true;
      this.apiService.getUser(username).subscribe({
        next: (data) => {
          this.user = data;
          this.errorMessage = '';
          this.isLoading = false;

          if (this.user) {
            this.apiService.user = this.user;
            this.userStateService.setUser(this.user);
          }
        },
        error: (error) => {
          this.user = null;
          this.errorMessage = 'User not found!';
          this.isLoading = false;
          console.error('API error : ', error);
          this.router.navigate(['not-found']);
        },
        complete: () => {
          console.log('User fetched!');
        },
      });
    }
  }

  ngOnInit(): void {
    this.userStateService.getUser().subscribe((user) => {
      this.user = user;
    });
    if (!this.user?.login) {
      this.router.navigate(['']);
    }
  }
}
