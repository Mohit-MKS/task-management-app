import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });;

  constructor(private _fb: FormBuilder, private _authService: AuthService) {
  }

  ngOnInit(): void {
  }


  login() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value);
    }
  }

}
