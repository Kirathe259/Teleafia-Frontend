import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { VerifyOtpComponent } from './otp-verification/otp-verification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignUpComponent, VerifyOtpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'teleafia';
}
