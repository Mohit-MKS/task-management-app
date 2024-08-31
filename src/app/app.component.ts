import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-management-app';

  isLoggedIn$ = this._authService.isLoggedIn()

  constructor(private _authService: AuthService) { }


}
