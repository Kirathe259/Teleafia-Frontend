import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // SnackBar service
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatIconModule // Ensure all necessary Angular Material modules are imported
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MatSnackBar] // Provide the service here, if needed
})
export class SignUpComponent {
  signUpForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      residence: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', { duration: 2000 });
      return;
    }

    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', { duration: 2000 });
      return;
    }

    const userData = this.signUpForm.value;
    console.log('User Data:', userData);

    // Mock successful response
    this.snackBar.open('Registration successful!', 'Close', { duration: 2000 });
    setTimeout(() => this.router.navigate(['/verify-otp'], { state: { email: userData.email } }), 3000);
  }
}
