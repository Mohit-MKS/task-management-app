import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Constants } from 'src/app/shared/utils/constants';

describe('AuthService', () => {
  let service: AuthService;
  let toaster: ToastrService;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
    toaster = TestBed.inject(ToastrService);
    router = TestBed.inject(Router)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout the user successfully', () => {
    StorageService.deleteItem(Constants.LoginUserKey);
    spyOn(toaster, 'success');
    spyOn(router, 'navigate');
    service.logout();
    expect(StorageService.getItem(Constants.LoginUserKey)).toBeNull();
    expect(toaster.success).toHaveBeenCalledWith('Logged out successfully');
    expect(router.navigate).toHaveBeenCalledWith(['auth', 'login']);
  });

  it('should register a new user successfully', () => {
    const user = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
    spyOn(toaster, 'success');
    spyOn(router, 'navigate');
    service.register(user);

    const users = StorageService.getItem(Constants.UsersKey);
    expect(users).toBeDefined();
    expect(users[user.email]).toBeDefined();
    expect(users[user.email].name).toBe(user.name);
    expect(users[user.email].email).toBe(user.email);
    expect(users[user.email].password).toBe(user.password);
    expect(toaster.success).toHaveBeenCalledWith('User registered successfully');
    expect(router.navigate).toHaveBeenCalledWith(['auth', 'login'])
  });

  it('should not login with invalid credentials', () => {
    const user = { email: 'john@example.com', password: 'wrongpassword' };
    spyOn(toaster, 'error');
    service.login(user);
    expect(toaster.error).toHaveBeenCalledWith('Invalid credential');
  });

  it('should not login if user is not found', () => {
    spyOn(toaster, 'error');
    service.login({ email: 'notfound@example.com', password: 'password' });
    expect(toaster.error).toHaveBeenCalledWith('User not found');
  });

  it('should return true if user is logged in', () => {
    StorageService.setItem(Constants.LoginUserKey, { name: 'John Doe', email: 'john@example.com' });
    service.isLoggedIn().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
    });
  });

  it('should return false if user is not logged in', () => {
    StorageService.deleteItem(Constants.LoginUserKey);
    service.isLoggedIn().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
    });
  });


});
