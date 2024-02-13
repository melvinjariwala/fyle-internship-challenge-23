import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { HttpClientModule } from '@angular/common/http';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
