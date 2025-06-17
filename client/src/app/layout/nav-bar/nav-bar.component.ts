import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, RouterLink, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  private authService = inject(AuthService);

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

}
