import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http'; // Import HttpClient and HttpHeaders
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,  // Import HttpClientModule here
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  showPassword: boolean = false;
  avatarSrcImageUrl: string = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  fetchAvatar(userToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${userToken}`);
    return this.http.get<any>('http://192.168.88.141:5500/api/patient/getProfileImage/37449211', { headers })
      .pipe(
        catchError(error => {
          console.error("Error fetching avatar:", error);
          return throwError(() => new Error('Error fetching avatar'));
        })
      ).subscribe(response => {
        if (response && response.avatarSrcImageUrl) {
          this.avatarSrcImageUrl = response.avatarSrcImageUrl;
        } else {
          console.error("avatarSrcImageUrl not found in response:", response);
        }
      });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loading = true;
    this.http.post<any>('http://192.168.88.141:5500/api/login', { email, password })
      .pipe(
        catchError(error => {
          this.errorMessage = error.status === 403
            ? "Email not verified. Please verify your email to login."
            : "Login failed. Please check your credentials.";
          console.error("Login Error:", error);
          return throwError(() => new Error('Login failed'));
        })
      ).subscribe(response => {
        const { accessToken, refreshToken, role } = response;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("Refresh-Token", refreshToken);

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`,
          'Refresh-Token': `Bearer ${refreshToken}`
        });

        // Fetch the avatar image after login
        this.fetchAvatar(accessToken);

        switch (role) {
          case "admin":
            this.router.navigate(['/admin-dashboard']);
            break;
          case "doctor":
            this.router.navigate(['/doctor-dashboard']);
            break;
          case "patient":
            this.router.navigate(['/patient-dashboard']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
      }).add(() => {
        this.loading = false;
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
