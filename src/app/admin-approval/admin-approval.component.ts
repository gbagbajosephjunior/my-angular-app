import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent {
  pendingUsers: any[] = [];

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPendingUsers();
  }

  loadPendingUsers(): void {
    this.userService.getPendingUsers().subscribe(
      (users) => {
        this.pendingUsers = users;
      },
      (error) => {
        console.error('Error fetching pending users:', error);
      }
    );
  }

  approveUser(userId: string): void {
    this.userService.approveUser(userId).subscribe(
      (response) => {
        console.log('User approved successfully:', response);

        // Log in the approved user with the obtained user ID
        this.authService.loginWithUserId(response.userId).subscribe(
          () => {
            console.log('User logged in successfully after approval');
            // Additional logic or navigation after successful login
          },
          (error) => {
            console.error('Error logging in after approval:', error);
          }
        );

        // Reload the list of pending users after approval
        this.loadPendingUsers();
      },
      (error) => {
        console.error('Error approving user:', error);
      }
    );
  }

}
