import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.group({

    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  })

  onSubmit() {
    window.alert(JSON.stringify(this.registerForm.value))
  }
}
