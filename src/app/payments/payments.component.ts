import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ]
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  showCardFields = false;
  showMpesaFields = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['mpesa', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?254[0-9]{9}$/)]], // Kenya phone number format
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]], // Card number format
      cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // MM/YY format
      cardCvc: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]], // CVC format
    });
  }

  ngOnInit(): void {
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      this.showCardFields = value === 'card';
      this.showMpesaFields = value === 'mpesa';
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Payment initiated', this.paymentForm.value);
      // Implement payment initiation logic here
    } else {
      console.log('Form is not valid');
      // Optionally mark all fields as touched to show validation errors
      this.paymentForm.markAllAsTouched();
    }
  }
}
