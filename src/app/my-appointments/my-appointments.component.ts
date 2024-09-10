import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-history',
  standalone: true,
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule
    
  ]
})
export class AppointmentHistoryComponent implements OnInit {
  appointmentId: string = '';
  appointments: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('appointmentId') || '';
      this.fetchData(); // Fetch data from the server
    });
  }

  fetchData() {
    if (this.appointmentId) {
      this.loading = true;
      this.http
        .get<any[]>(`http://192.168.89.29:5500/api/appointments/appointmentStatus/${this.appointmentId}`)
        .pipe(
          catchError(error => {
            this.error = 'Error fetching data';
            this.loading = false;
            return of([]);
          })
        )
        .subscribe((response) => {
          this.appointments = response.length ? [response] : [];
          this.loading = false;
        });
    }
  }

  navigateToBookAppointment() {
    this.router.navigate(['/book-appointment']);
  }
}
