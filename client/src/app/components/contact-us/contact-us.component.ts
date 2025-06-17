import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  private formBuilder = inject(FormBuilder);
  private contactService = inject(ContactService);

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    comments: [''],
    subscribe: ['yes', [Validators.required]],
    interests: this.formBuilder.group(
      {
        anime: [false,],
        arts: [false,],
        judo: [false,],
        language: [false],
        science: [false],
        travel: [false],
      },
      { validators: [this.atLeastOneInterestSelected] }
    ),
    hear: ['', [Validators.required, Validators.pattern(/^\s*(?!select\s+one\s*$).+/i)]
    ],
    terms: [false, Validators.requiredTrue],
  })

  get subscribe() {
    return this.contactForm.get('subscribe');
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }
  get interests() {
    return this.contactForm.get('interests');
  }

  get hear() {
    return this.contactForm.get('hear');
  }

  get terms() {
    return this.contactForm.get('terms');
  }

  get comments() {
    return this.contactForm.get('comments')
  }

  onSubmit() {
    this.contactService.sendContactInformation(
      this.contactForm.get('name')?.value ?? '',
      this.contactForm.get('email')?.value ?? '',
      this.contactForm.get('comments')?.value ?? '',
      this.contactForm.get('subscribe')?.value ?? '',
      this.contactForm.get('interests.anime')?.value ?? false,
      this.contactForm.get('interests.arts')?.value ?? false,
      this.contactForm.get('interests.judo')?.value ?? false,
      this.contactForm.get('interests.language')?.value ?? false,
      this.contactForm.get('interests.science')?.value ?? false,
      this.contactForm.get('interests.travel')?.value ?? false,
      this.contactForm.get('hear')?.value ?? ''
    );
  }

  atLeastOneInterestSelected(group: AbstractControl): ValidationErrors | null {
    const controls = (group as FormGroup).controls;
    const selected = Object.values(group.value).some(value => value === true);
    return selected ? null : { atLeastOneRequired: true }
  }
}
