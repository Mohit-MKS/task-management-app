import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { IUser } from 'src/app/auth/models/auth.interfaces';
import { Constants } from '../../utils/constants';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: IUser = StorageService.getItem(Constants.LoginUserKey)


  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
  }

}
