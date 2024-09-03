// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service'; // Import AuthService
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', { duration: 2000 });
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loading = true;

    try {
      const response = await this.authService.login(email, password).toPromise();
      if (response) {
        const { accessToken, refreshToken, role } = response;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("Refresh-Token", refreshToken);

        this.authService.fetchAvatar(accessToken).subscribe({
          next: (avatarResponse) => {
            const avatarSrcImageUrl = avatarResponse.avatarSrcImageUrl || '';
            localStorage.setItem("avatarSrcImageUrl", avatarSrcImageUrl);

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
          },
          error: (err) => {
            console.error('Error fetching avatar:', err);
            this.snackBar.open('Login successful but failed to fetch avatar. Please try again later.', 'Close', { duration: 3000 });
          }
        });
      }
    } catch (error) {
      this.errorMessage = 'Login failed. Please check your credentials or try again later.';
      this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }
}
