import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  template: ''
})
class DummyComponent { }

const routes: Routes = [
  { path: 'dashboard', component: DummyComponent },
  { path: 'task', component: DummyComponent },
  { path: 'auth/login', component: DummyComponent }
];


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ToastrModule.forRoot(), RouterTestingModule.withRoutes(routes)]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information when logged in', () => {
    authService.login({ email: 'mohit@gmail.com', password: 'Password123' });
    fixture.detectChanges();
    const userName = fixture.debugElement.query(By.css('.user-name')).nativeElement.textContent.trim();
    const userEmail = fixture.debugElement.query(By.css('.user-email')).nativeElement.textContent.trim();
    expect(userName).toBe('Mohit');
    expect(userEmail).toBe('mohit@gmail.com');
  });

  it('should call logout method on logout button click', () => {
    authService.login({ email: 'mohit@gmail.com', password: 'Password123' })
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.queryAll(By.css('.dropdown-item'))[2].nativeElement;
    spyOn(component, 'logout').and.callThrough();
    logoutButton.click();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should not display user information if logged out', () => {
    authService.logout()
    fixture.detectChanges();
    const userInfo = fixture.debugElement.query(By.css('.user-info'));
    expect(userInfo).toBeFalsy();
  });

  it('should display the user dropdown when user is logged in', fakeAsync(() => {
    authService.login({ email: 'mohit@gmail.com', password: 'Password123' })
    fixture.detectChanges()
    const userDropdown = fixture.debugElement.query(By.css('.user-info'));
    expect(userDropdown).toBeTruthy();
  }));
});
