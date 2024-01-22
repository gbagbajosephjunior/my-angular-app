import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  tempKey: string = '';
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      tempKey: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.verifyTempKey(this.loginForm.value.username, this.loginForm.value.tempKey).subscribe(
        (isValid: boolean) => {
          if (!isValid) {
            this.authService.login(this.loginForm.value.username);
            this.router.navigate(['/user-list']);
            // Reset the form values after successful login
            this.loginForm.reset();
          } else {
            console.error('Invalid temporary key');
          }
        },
        (error) => {
          console.error('Error verifying temporary key:', error);
        }
      );
    }
  }
  
  
}
