import { Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { VerifyOtpComponent } from './otp-verification/otp-verification.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // Redirects root path to signup
  { path: 'signup', component: SignUpComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: '**', redirectTo: 'signup' } // Redirects any undefined paths to signup
];
