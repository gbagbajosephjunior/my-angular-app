import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserKey = 'currentUser';
  private readonly adminListKey = 'adminList';
  private readonly apiUrl = 'https://my-angular-app-ee92d-default-rtdb.firebaseio.com/users.json';

  login(username: string): void {
    localStorage.setItem(this.currentUserKey, username);
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.currentUserKey);
  }
  

  isAdmin(): boolean {
    const currentAdminList = this.getAdminList();
    const currentUser = this.getCurrentUser();
    // return currentAdminList.includes(this.currentUserKey);
      return currentUser === 'admin';
  }



  makeUserAdmin(username: string): void {
    const currentAdminList = this.getAdminList();
    currentAdminList.push(username);
    localStorage.setItem(this.adminListKey, JSON.stringify(currentAdminList));
  }

  isAdminOf(username: string): boolean {
    const currentAdminList = this.getAdminList();
    const currentUser = this.getCurrentUser();
    return currentAdminList.includes(this.currentUserKey) && currentUser !== username;
  }

  private getAdminList(): string[] {
    const adminListString = localStorage.getItem(this.adminListKey);
    return adminListString ? JSON.parse(adminListString) : [];
  }
 
  verifyTempKey(username: string, tempKey: string): Observable<boolean> {
    // Implement logic to verify the temporary key
    // You may want to send a request to your server to validate the key
    // Return true if the key is valid, false otherwise
    const isValid = tempKey === 'fetched_temp_key'; // Replace with your actual logic
    return new Observable<boolean>((observer) => {
      observer.next(isValid);
      observer.complete();
    });
  }
  
  loginWithUserId(userId: string): Observable<void> {
    // Implement logic to log in with the user ID
    // You may want to send a request to your server to validate the ID and log in the user
    // For simplicity, this example assumes a successful login without server interaction
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
  
}
