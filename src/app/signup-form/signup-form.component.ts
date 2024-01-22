// signup-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const userData = {
        ...this.signupForm.value,
        status: 'pending'
      };

      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.authService.login(userData.username);

          // Reset the form after successful submission
          this.signupForm.reset();
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
