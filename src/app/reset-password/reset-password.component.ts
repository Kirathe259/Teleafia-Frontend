import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Define an interface for the API response
interface ApiResponse {
  message: string;
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule
  ],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        newPassword: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  /**
   * Get error message for the new password field based on validation errors.
   */
  getPasswordErrorMessage(): string {
    if (this.newPassword?.hasError('required')) {
      return 'Password is required';
    } else if (this.newPassword?.hasError('minlength')) {
      return 'Password must be at least 5 characters long';
    }
    return '';
  }

  passwordMatchValidator(formGroup: FormGroup): null | object {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async handleResetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, newPassword } = this.resetPasswordForm.value;

    try {
      const response = await this.http.put<ApiResponse>('/api/resetpassword', { email, newPassword }).toPromise();
      this.successMessage = response?.message || 'Password reset successful.';
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error?.error?.message || 'An error occurred while resetting the password.';
    } finally {
      this.loading = false;
    }
  }
}
