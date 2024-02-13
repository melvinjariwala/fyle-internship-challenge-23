import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiCacheService } from './api-cache.service';
import { UserStateService } from './user-state.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, ApiCacheService, UserStateService],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', inject([ApiService], (apiService: ApiService) => {
    const username = 'melvinjariwala';
    apiService.getUser(username).subscribe((data) => {
      expect(data).toBeDefined();
    });
  }));

  it('should get user repositories', inject(
    [ApiService],
    (apiService: ApiService) => {
      const username = 'melvinjariwala';
      const page = 1;
      const per_page = 10;

      apiService
        .getUserRepositories(username, page, per_page)
        .subscribe((data) => {
          expect(data).toBeDefined();
        });
    }
  ));
});
