
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password controls', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    expect(emailControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
  });

  it('should make the form invalid if fields are empty', () => {
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should make the form valid with correct values', () => {
    component.loginForm.controls.email.setValue('test@example.com');
    component.loginForm.controls.password.setValue('password123');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call authService.login on form submission if form is valid', () => {
    spyOn(authService, 'login').and.callThrough();
    spyOn(router, 'navigate').and.stub();

    component.loginForm.controls.email.setValue('mohit@gmail.com');
    component.loginForm.controls.password.setValue('Mohit@123');
    component.login();

    expect(authService.login).toHaveBeenCalledWith({ email: 'mohit@gmail.com', password: 'Mohit@123' });
  });

  it('should not call authService.login on form submission if form is invalid', () => {
    spyOn(authService, 'login');
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('');
    component.login();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should disable the submit button when the form is invalid', () => {
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button when the form is valid', () => {
    component.loginForm.controls.email.setValue('test@example.com');
    component.loginForm.controls.password.setValue('password123');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalse();
  });

  it('should render the login form with correct labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label[for="email"]').textContent).toContain('Email');
    expect(compiled.querySelector('label[for="password"]').textContent).toContain('Password');
  });


});
