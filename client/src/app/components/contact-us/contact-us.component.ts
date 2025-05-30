import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  private formBuilder = inject(FormBuilder);

  contactForm = this.formBuilder.group({
    name: [''],
    email: [''],
    comments: [''],
    subscribe: ['yes'],
    anime: [false],
    arts: [false],
    judo: [false],
    language: [false],
    science: [false],
    travel: [false],
    hear: [''],
    terms: [false],
  })

  get subscribed() {
    return this.contactForm.get('subscribe');
  }

  changeHear(e: Event) {
    this.contactForm.patchValue({ hear: (e.target as HTMLInputElement).value })
  }

  onSubmit() {
    window.alert(JSON.stringify(this.contactForm.value))
  }
}
