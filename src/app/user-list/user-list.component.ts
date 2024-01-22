// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentUser: any; // Assuming you have a way to get the current user
  isDialogOpen = false; // Flag to track if the dialog is open
  private routeSubscription!: Subscription;


  constructor(private userService: UserService,  private router: Router, private authService: AuthService, private dialog: MatDialog) {}


  
  ngOnInit(): void {
    this.loadUsers();
    // Subscribe to router events to detect route changes
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and close the dialog if not on UserListComponent
        if (this.router.url !== '/user-list') {
          this.closeDialog();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from router events to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }


  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  canEdit(user: any): boolean {
    // Implement your logic to determine if the current user can edit this user
    // For example, allow editing only if the user is an admin
    return this.currentUser && this.currentUser.role === 'admin';
  }

  editUser(user: User): void {
    // Example: Open a modal for editing
    console.log('Editing user:', user);
  
    // Check if the dialog is already open, if not, open it
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;

      const dialogRef = this.dialog.open(UserEditDialogComponent, {
        width: '400px', // Set the width of the dialog as per your design
        data: user, // Pass the user data to the dialog
      });

      dialogRef.afterClosed().subscribe((updatedUser: User | undefined) => {
        this.isDialogOpen = false;

        if (updatedUser) {
          // Update the user data in the backend
          this.userService.updateUser(updatedUser).subscribe(
            (updatedUserResponse) => {
              console.log('User updated successfully:', updatedUserResponse);
              // Update the user list after updating
              this.loadUsers();
            },
            (error) => {
              console.error('Error updating user:', error);
            }
          );
        }
      });
    }
  
  

 
}
// Function to close the dialog
private closeDialog(): void {
  if (this.isDialogOpen) {
    this.dialog.closeAll();
    this.isDialogOpen = false;
  }
}
}
