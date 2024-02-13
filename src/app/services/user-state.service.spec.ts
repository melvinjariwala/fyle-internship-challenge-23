import { TestBed } from '@angular/core/testing';

import { UserStateService } from './user-state.service';

describe('UserStateService', () => {
  let service: UserStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStateService],
    });
    service = TestBed.inject(UserStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial user value as null', () => {
    service.getUser().subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should set and get user', () => {
    const mockUser = { id: 1, name: 'John Doe' };

    // Set user
    service.setUser(mockUser);

    // Get user and check if it matches the mock user
    service.getUser().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  });
});
