import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../services/api.service';
import { UserStateService } from '../services/user-state.service';
import { of } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserReposComponent } from '../user-repos/user-repos.component';
import { PaginationComponent } from '../pagination/pagination.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let userStateService: jasmine.SpyObj<UserStateService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser']);
    const userStateServiceSpy = jasmine.createSpyObj('UserStateService', [
      'getUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        UserProfileComponent,
        NavbarComponent,
        UserInfoComponent,
        UserReposComponent,
        PaginationComponent,
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: UserStateService, useValue: userStateServiceSpy },
      ],
      imports: [HttpClientModule, RouterTestingModule, PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    userStateService = TestBed.inject(
      UserStateService
    ) as jasmine.SpyObj<UserStateService>;
    component.user = { public_repos: 10 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
