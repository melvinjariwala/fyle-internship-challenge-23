import { TestBed } from '@angular/core/testing';

import { UserRepoStateService } from './user-repo-state.service';

describe('UserRepoStateService', () => {
  let service: UserRepoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRepoStateService],
    });
    service = TestBed.inject(UserRepoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
