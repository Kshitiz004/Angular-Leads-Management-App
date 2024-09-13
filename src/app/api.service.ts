import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://dev-cc.automateazy.com/api/v1';
  private apiUrl = `${this.baseUrl}/users/auth`;
  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Login API call to generate the token
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Save token to local storage
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Retrieve token from local storage
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Save the current user to local storage
  setCurrentUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }
  }

  // Handle errors during HTTP calls
  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Fetch leads using the token for authentication
  getLeads(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/getLeads`, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }
}
