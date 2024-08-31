import { Injectable } from '@angular/core';
import { ILoginRqst, IRegisterRqst, IUser, IUsersObj } from '../models/auth.interfaces';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Constants } from 'src/app/shared/utils/constants';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _loggedInUser$ = new BehaviorSubject<IUser>(null)

  constructor(private _toaster: ToastrService, private _router: Router) { }

  register(user: IRegisterRqst) {
    const users = StorageService.getItem(Constants.UsersKey) as IUsersObj;
    if (users) {
      if (!users[user.email]) {
        StorageService.setItem(Constants.UsersKey, { ...users, [user.email]: { name: user.name, email: user.email, password: user.password } })
      }
      else {
        this._toaster.error('User already registered')
      }
    }
    else {
      StorageService.setItem(Constants.UsersKey, { [user.email]: { name: user.name, email: user.email, password: user.password } })
    }

  }

  login(user: ILoginRqst) {
    const users = StorageService.getItem(Constants.UsersKey)
    if (users && users[user.email]) {
      const userData = users[user.email]
      if (userData.password === user.password) {
        const userDetail = { name: userData.name, email: userData.email }
        StorageService.setItem(Constants.LoginUserKey, userDetail)
        this._loggedInUser$.next(userDetail)
        this._isLoggedIn$.next(true)
        this._router.navigate(['dashboard'])
      }
      else {
        this._toaster.error('Invalid credential')
      }
    }
    else {
      this._toaster.error('User not found')
    }
  }

  getLoggedInUser() {
    return this._loggedInUser$.asObservable()

  }

  logout() {
    StorageService.deleteItem(Constants.LoginUserKey)
    this._isLoggedIn$.next(false);
    this._loggedInUser$.next(null)
    this._router.navigate(['auth', 'login']);
  }

  isLoggedIn() {
    const user = StorageService.getItem(Constants.LoginUserKey)
    if (user) {
      this._loggedInUser$.next(user)
      this._isLoggedIn$.next(true)
    }
    return this._isLoggedIn$.asObservable();
  }
}
