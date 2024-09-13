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
  private apiUrl = 'https://dev-cc.automateazy.com/api/v1/users/auth';
  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';
  private persistKey = 'persist';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.currentUserKey) || '{}');
    }
    return null;
  }

  setCurrentUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }
  }

  getPersist(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.persistKey) || '{}');
    }
    return null;
  }

  setPersist(persist: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.persistKey, JSON.stringify(persist));
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.currentUserKey);
      localStorage.removeItem(this.persistKey);
    }
  }

  getLeads(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/getLeads`, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }
}
