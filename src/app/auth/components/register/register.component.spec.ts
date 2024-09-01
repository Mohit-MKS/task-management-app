import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values and validators', () => {
    expect(component.registerForm.controls['name'].value).toBe('');
    expect(component.registerForm.controls['email'].value).toBe('');
    expect(component.registerForm.controls['password'].value).toBe('');
    expect(component.registerForm.controls['confirmPassword'].value).toBe('');
    expect(component.registerForm.controls['name'].validator).toBeTruthy();
    expect(component.registerForm.controls['email'].validator).toBeTruthy();
    expect(component.registerForm.controls['password'].validator).toBeTruthy();
    expect(component.registerForm.controls['confirmPassword'].validator).toBeTruthy();
  });

  it('should call register method of AuthService on form submission when form is valid', () => {
    component.registerForm.controls['name'].setValue('Mohit');
    component.registerForm.controls['email'].setValue('mohit@gmail.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmPassword'].setValue('Password123');
    fixture.detectChanges();

    spyOn(component, 'register').and.callThrough();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.register).toHaveBeenCalled();
  });

  it('should not call register method of AuthService when form is invalid', () => {
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['confirmPassword'].setValue('');
    fixture.detectChanges();

    spyOn(component, 'register').and.callThrough();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.register).not.toHaveBeenCalled();
  });


  it('should have a link to the login page', () => {
    const link = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(link.textContent).toContain('Login');
    expect(link.getAttribute('routerLink')).toBe('/auth/login');
  });

});
