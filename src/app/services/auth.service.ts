// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://192.168.88.141:5500/api'; // Base URL for the API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(catchError(this.handleError));
  }

  signup(name: string, email: string, phoneNumber: string, idNumber: string, password: string, gender: string, dateOfBirth: string, residence: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, { name, email, phoneNumber, idNumber, password, gender, dateOfBirth, residence })
      .pipe(catchError(this.handleError));
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verifyotp`, { email, otp })
      .pipe(catchError(this.handleError));
  }

  resendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resendotp`, { email })
      .pipe(catchError(this.handleError));
  }

  fetchAvatar(userToken: string): Observable<{ avatarSrcImageUrl: string }> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${userToken}`);
    return this.http.get<{ avatarSrcImageUrl: string }>(`${this.baseUrl}/patient/getProfileImage/37449211`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
