import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';  

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  standalone: true,
  imports: [
    CommonModule,  // Corrected: Import CommonModule
    ReactiveFormsModule,  // Corrected: Import ReactiveFormsModule
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule,
    MatGridListModule 
  ],
})
export class BookAppointmentComponent implements OnInit {
  form: FormGroup;
  services: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  isLoading = false;
  isFetchingUserData = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      idNumber: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      service: ['', Validators.required],
      time: [''],
      appointmentType: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      bookFor: ['', Validators.required],
      residence: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices() {
    this.http.get<any[]>('http://192.168.88.129:5500/api/service/viewallservices').subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch services. Please try again.';
      }
    );
  }

  onBookForChange(event: MatSelectChange) {
    if (event.value === 'myself') {
      const idNumber = this.form.get('idNumber')?.value;
      if (idNumber) {
        this.getUserData(idNumber);
      } else {
        this.errorMessage = 'Please fill in the ID field first.';
      }
    } else {
      this.form.reset({
        idNumber: '',
        fullName: '',
        phoneNumber: '',
        service: '',
        time: '',
        appointmentType: '',
        age: '',
        gender: '',
        bookFor: 'myself',
        residence: '',
      });
    }
  }

  getUserData(idNumber: string) {
    this.isFetchingUserData = true;
    this.http.get(`http://192.168.90.31:5500/api/patient/viewonepatient/${idNumber}`).subscribe(
      (userData: any) => {
        this.form.patchValue({
          idNumber: userData.idNumber,
          fullName: userData.name,
          phoneNumber: userData.phoneNumber,
          age: userData.age,
          gender: userData.gender,
          residence: userData.residence,
        });
        this.isFetchingUserData = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch user data. Please try again.';
        this.isFetchingUserData = false;
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.isLoading = true;
    this.http.post('http://192.168.88.129:5500/api/appointments/bookappointment', this.form.value).subscribe(
      (response: any) => {
        this.successMessage = 'Appointment booked successfully';
        this.errorMessage = '';
        this.snackBar.open(this.successMessage, '', { duration: 2000 });
        setTimeout(() => {
          this.router.navigate(['/payments'], { state: { appointmentId: response.appointmentId } });
        }, 2000);
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = 'Error booking appointment';
      }
    );
    this.isLoading = false;
  }
}
