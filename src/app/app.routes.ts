import { Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { VerifyOtpComponent } from './otp-verification/otp-verification.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // Import the PageNotFoundComponent
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; // Import the ForgotPasswordComponent

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // Redirects root path to signup
  { path: 'signup', component: SignUpComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }, // Route for forgot password
  { path: '404', component: PageNotFoundComponent }, // Route for the 404 page
  { path: '**', redirectTo: '404' } // Redirects any undefined paths to the 404 page
];
