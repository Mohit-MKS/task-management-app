import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/auth/models/auth.interfaces';
import { StorageService } from '../../services/storage.service';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  user: IUser = StorageService.getItem(Constants.LoginUserKey)

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._router.navigate(['/login']);

  }

}
