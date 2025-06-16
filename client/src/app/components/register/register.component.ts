import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  errorMessage: string | null = null;

  registerForm = this.formBuilder.group({

    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    ]],
    confirmPassword: ['', [
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    ]],
  }, { validators: passwordMatchValidator() })

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.sendRegistrationInformation(this.firstName!.value!, this.lastName!.value!, this.email!.value!, this.password!.value!, this.confirmPassword!.value!)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.errorMessage = null;
          },
          error: (error) => {
            if (error.status === 400) {
              this.errorMessage = 'Bad Request. Unable to register user';
            } else if (error.status === 0) {
              this.errorMessage = 'Network error. Please check your connection.';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again.';
            }
          }
        }
        )
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
