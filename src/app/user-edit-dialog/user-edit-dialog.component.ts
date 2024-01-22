// user-edit-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {
  updatedUser: User;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    // Initialize the updated user with the user data
    this.updatedUser = { ...user };
    
  }

  // Implement your logic for editing the user within this component
  // ...

  onSave(): void {
    // Close the dialog and pass the updated user back to the caller
    this.dialogRef.close(this.updatedUser);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
