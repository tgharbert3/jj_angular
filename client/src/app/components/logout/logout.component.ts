import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  private authService = inject(AuthService);

  firstName: string = '';

  ngOnInit(): void {
    this.authService.userFirstname$.subscribe(fName => {
      this.firstName = fName;
    })
    this.authService.logout().subscribe({
      next: (response) => {
        console.info("Successfully logged out", response);
      },
      error: (error) => {
        console.error("Logout failed", error);
      }
    });
  }


}
