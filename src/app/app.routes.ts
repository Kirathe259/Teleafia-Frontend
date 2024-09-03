import { Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { VerifyOtpComponent } from './otp-verification/otp-verification.component';
import { LoginComponent } from './login/login.component'; // Import the LoginComponent

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // Redirects root path to signup
  { path: 'signup', component: SignUpComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'login', component: LoginComponent }, // Add route for LoginComponent
  { path: '**', redirectTo: 'signup' } // Redirects any undefined paths to signup
];
