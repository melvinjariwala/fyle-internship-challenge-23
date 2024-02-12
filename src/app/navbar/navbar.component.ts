import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserStateService } from '../services/user-state.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() homeClick = new EventEmitter<void>();
  @Output() searchUserClick = new EventEmitter<string>();
  @Output() searchUserEvent = new EventEmitter<Event>();

  searchEvent: Event | undefined;
  searchUsername: string = '';
  user: any;

  constructor(
    private userStateService: UserStateService,
    private apiService: ApiService
  ) {}

  navigateToHomePage(): void {
    this.homeClick.emit();
  }

  searchUser(event: Event, username: string): void {
    event.preventDefault();
    this.searchUsername = username;
    this.searchUserClick.emit(this.searchUsername);
  }

  ngOnInit(): void {
    this.userStateService.getUser().subscribe((user) => {
      this.user = user;
      console.log('this.user : ', this.user);
    });
  }
}
