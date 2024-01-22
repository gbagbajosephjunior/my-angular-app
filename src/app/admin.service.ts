import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private authService: AuthService) {}

  // Approve the first user and make them an admin
  approveFirstUser(username: string): void {
    if (!this.authService.isAdmin() && !this.authService.getCurrentUser()) {
      this.authService.login(username);
      this.authService.makeUserAdmin(username);
    }
  }

  // Add other admin-related functionality as needed
}
