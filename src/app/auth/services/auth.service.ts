import { Injectable } from '@angular/core';
import { ILoginRqst, IUser, IUsersObj } from '../models/auth.interfaces';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Constants } from 'src/app/shared/utils/constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _toaster: ToastrService) { }

  register(user: any) {
    const users = StorageService.getItem(Constants.UsersKey) as IUsersObj;
    if (users) {
      if (!users[user.email]) {
        StorageService.setItem(Constants.UsersKey, { ...users, [user.email]: { name: name, email: user.email } })
      }
      else {
        this._toaster.error('User already registered')
      }
    }
    else {
      StorageService.setItem(Constants.UsersKey, { [user.email]: { name: name, email: user.email } })
    }

  }

  login(user: ILoginRqst) {
    const users = StorageService.getItem(Constants.UsersKey)
    if (users && users[user.email]) {
      const userData = users[user.email]
      if (userData.password === user.password) {
        StorageService.setItem(Constants.LoginUserKey, user)
      }
      else {
        this._toaster.error('Invalid credential')
      }
    }
    else {
      this._toaster.error('User not found')
    }

  }

  isLoggedIn() {
    return !!StorageService.getItem(Constants.LoginUserKey);
  }
}
