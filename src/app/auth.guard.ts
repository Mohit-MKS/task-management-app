import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private _authService: AuthService, private _router: Router) { }

  canLoad(): Observable<boolean> {
    return this._authService.isLoggedIn().pipe(
      take(1), // Automatically complete the observable after the first emission
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          this._router.navigate(['auth', 'login']);
          return false;
        }
      })
    );
  }

}
