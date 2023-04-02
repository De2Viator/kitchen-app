import { Component } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: '../templates/profile.component.html',
  styleUrls: ['../styles/profile.component.scss']
})
export class ProfileComponent {
  constructor(public readonly authService: AuthService, private readonly router: Router) {}
  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/auth'])
  }

  async changePassword() {
    await this.authService.changePassword();
    this.router.navigate(['/auth'])
  }
}
