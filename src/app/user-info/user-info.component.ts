import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user: any;
  constructor(
    private apiService: ApiService,
    private userStateServie: UserStateService
  ) {
    // this.user = this.apiService.user;
  }

  ngOnInit(): void {
    this.userStateServie.getUser().subscribe((user) => {
      this.user = user;
    });
  }
}
