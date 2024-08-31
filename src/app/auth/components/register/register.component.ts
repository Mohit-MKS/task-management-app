import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, ValidatorService.matchFieldValidator('password')]]
  });;

  constructor(private _fb: FormBuilder, private _authService: AuthService) {
  }

  ngOnInit(): void {
  }


  register() {
    if (this.registerForm.valid) {
      this._authService.register(this.registerForm.value);
    }
  }

}
