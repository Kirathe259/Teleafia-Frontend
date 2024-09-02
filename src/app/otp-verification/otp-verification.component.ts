import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class VerifyOtpComponent implements OnInit {
  otpForm: FormGroup;
  email: string = '';
  verifyLoading = false;
  resendLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.otpForm = this.fb.group({
      otp: this.fb.array([
        new FormControl('', Validators.required),  // Adding Validators for better form handling
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required)
      ])
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras.state?.['email'] || '';
  }

  get otpArray(): FormArray {
    return this.otpForm.get('otp') as FormArray;
  }

  getOtpControl(index: number): FormControl {
    return this.otpArray.at(index) as FormControl;
  }

  handleInputChange(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const control = this.getOtpControl(index);  // Using the getter method for proper typing
    control.setValue(value);

    if (value && index < this.otpArray.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  async handleVerifyOTP(event: Event): Promise<void> {
    event.preventDefault();
    this.verifyLoading = true;

    try {
      const enteredOtp = this.otpForm.value.otp.join('');
      const response = await lastValueFrom(this.http.post('/api/verifyotp', { enteredOtp }));

      if (response) {
        this.router.navigate(['/login']);
      } else {
        this.snackBar.open('Verification failed. Please try again.', '', { duration: 3000 });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      this.snackBar.open('An error occurred during OTP verification. Please try again later.', '', { duration: 3000 });
    }

    this.verifyLoading = false;
  }

  async handleResendOTP(): Promise<void> {
    this.resendLoading = true;

    try {
      const response = await lastValueFrom(this.http.post('/api/resendotp', { email: this.email }));

      if (response) {
        this.snackBar.open('OTP resent successfully.', '', { duration: 3000 });
      } else {
        this.snackBar.open('Failed to resend OTP. Please try again later.', '', { duration: 3000 });
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      this.snackBar.open('An error occurred while resending OTP. Please try again later.', '', { duration: 3000 });
    }

    this.resendLoading = false;
  }
}
