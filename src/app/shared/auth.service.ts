import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = 'http://localhost:8010/api/users';
  private apiUrl = 'https://angularprojectbackend-4e78.onrender.com/api/users'
  loggedIn = false;

  constructor(private http: HttpClient) {}

logIn(username: string, password: string): Promise<boolean> {
  return this.http.post<any>(`${this.apiUrl}/login`, { user: username, password: password }).toPromise()
    .then(response => {
      if (response && response.message === 'Connexion réussie') {
        this.loggedIn = true;
        return true;
      } else {
        this.loggedIn = false;
        return false;
      }
    })
    .catch(() => {
      this.loggedIn = false;
      return false;
    });
}


  logout() {
    this.loggedIn = false;
  }

  isAdmin(): Promise<boolean> {
    return Promise.resolve(this.loggedIn);
  }
}
