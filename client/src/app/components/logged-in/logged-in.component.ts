import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-in',
  imports: [],
  templateUrl: './logged-in.component.html',
  styleUrl: './logged-in.component.scss'
})
export class LoggedInComponent implements OnInit {

  private authService = inject(AuthService)

  firstName: string = '';

  ngOnInit(): void {
    this.authService.userFirstname$.subscribe(fName => {
      this.firstName = fName;
    })
  }


}
