import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = this._authService.getLoggedInUser()


  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
  }

}
