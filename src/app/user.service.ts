import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://my-angular-app-ee92d-default-rtdb.firebaseio.com/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ [key: string]: User }>(this.apiUrl).pipe(
      map(responseData => {
        // Convert the response data (object) to an array
        const usersArray: User[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            usersArray.push({ ...responseData[key], id: key });
          }
        }
        return usersArray;
      })
    );
  }

  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    const updateUrl = `https://my-angular-app-ee92d-default-rtdb.firebaseio.com/users/${user.id}.json`;
    return this.http.put<User>(updateUrl, user);
  }

  removeUser(userId: string): Observable<void> {
    const deleteUrl = `https://my-angular-app-ee92d-default-rtdb.firebaseio.com/users/${userId}.json`;
    return this.http.delete<void>(deleteUrl);
  }

  getPendingUsers(): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => {
        if (Array.isArray(users)) {
          return users.filter(user => user.status === 'pending');
        } else {
          return [];
        }
      })
    );
  }

  // approveUser(userId: string): Observable<User> {
  //   return this.getUsers().pipe(
  //     switchMap(users => {
  //       const userToUpdate = users.find(user => user.id === userId);
  //       if (userToUpdate) {
  //         userToUpdate.status = 'approved';
  //         return this.updateUser(userToUpdate);
  //       } else {
  //         throw new Error('User not found');
  //       }
  //     })
  //   );
  // }

  approveUser(userId: string): Observable<any> {
    return this.getUsers().pipe(
      switchMap(users => {
        const userToUpdate = users.find(user => user.id === userId);
        if (userToUpdate) {
          userToUpdate.status = 'approved';
          return this.updateUser(userToUpdate);
        } else {
          throw new Error('User not found');
        }
      })
    );
    const approvedUser = { userId: userId }; // Replace with your actual logic
    return new Observable<any>((observer) => {
      observer.next(approvedUser);
      observer.complete();
    });
  }
}
