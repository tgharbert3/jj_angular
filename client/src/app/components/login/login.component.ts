import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  })

  onSubmit() {
    alert(JSON.stringify(this.loginForm.value))
  }
}
