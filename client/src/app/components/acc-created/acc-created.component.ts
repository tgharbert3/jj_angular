import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-acc-created',
  imports: [],
  templateUrl: './acc-created.component.html',
  styleUrl: './acc-created.component.scss'
})
export class AccCreatedComponent implements OnInit {

  private authService = inject(AuthService);

  firstName: string = '';

  ngOnInit(): void {
    this.authService.userFirstname$.subscribe(fname => {
      this.firstName = fname;
    });
  }
}
