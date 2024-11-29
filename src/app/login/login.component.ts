import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { LoginService } from '../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router)
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);

  error = ''
  
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.valid) {
      this.loginService.login(this.form.get('username')?.value, this.form.get('password')?.value);
    }
    if(this.loginService.loggedInUser$()) {
      this.error = '';
      this.router.navigate(["/search"])
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
