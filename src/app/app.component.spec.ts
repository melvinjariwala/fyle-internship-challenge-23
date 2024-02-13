import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ApiService],
      imports: [HttpClientModule, AppRoutingModule],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fyle-frontend-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('router-outlet')?.textContent).toContain(
  //     'fyle-frontend-challenge app is running!'
  //   );
  // });
});
