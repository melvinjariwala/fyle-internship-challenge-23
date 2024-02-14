import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReposComponent } from './user-repos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

describe('UserReposComponent', () => {
  let component: UserReposComponent;
  let fixture: ComponentFixture<UserReposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReposComponent, PaginationComponent],
      imports: [HttpClientModule, FormsModule, NgxSkeletonLoaderModule],
    });
    fixture = TestBed.createComponent(UserReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
