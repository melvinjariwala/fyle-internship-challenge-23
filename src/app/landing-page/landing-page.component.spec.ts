import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageComponent } from './landing-page.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UserStateService } from '../services/user-state.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;
  let userStateService: jasmine.SpyObj<UserStateService>;

  beforeEach(waitForAsync(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser']);
    const userStateServiceSpy = jasmine.createSpyObj('UserStateService', [
      'setUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: UserStateService, useValue: userStateServiceSpy },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router);
    userStateService = TestBed.inject(
      UserStateService
    ) as jasmine.SpyObj<UserStateService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error and navigate to not-found on unsuccessful search', fakeAsync(() => {
    const username = 'invalid777';
    apiService.getUser.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
            statusText: 'OK',
            error: {
              message: 'Not Found',
              documentation_url:
                'https://docs.github.com/rest/users/users#get-a-user',
            },
          })
      )
    );
    spyOn(router, 'navigate');

    component.searchUser(new Event('click'), username);

    tick();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(apiService.getUser).toHaveBeenCalledWith(username);
      expect(component.isLoading).toBe(false);
      expect(component.user).toBeUndefined();
      expect(component.errorMessage).toBe('User not found!');
      expect(router.navigate).toHaveBeenCalledWith(['not-found']);
    });
  }));

  it('should fetch user and navigate to user-profile on successful search', () => {
    const username = 'melvinjariwala';
    const userData = { login: username, name: 'Melvin Jariwala' };
    apiService.getUser.and.returnValue(of(userData));

    spyOn(router, 'navigate');

    component.searchUser(new Event('click'), username);

    expect(apiService.getUser).toHaveBeenCalledWith(username);
    expect(component.user).toEqual(userData);
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toEqual('');
    expect(router.navigate).toHaveBeenCalledWith(['user-profile']);
    expect(component.userStateService.setUser).toHaveBeenCalledWith(userData);
  });
});
