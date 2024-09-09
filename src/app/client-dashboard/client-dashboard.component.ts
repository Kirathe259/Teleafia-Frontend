import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

interface Service {
  name: string;
  route: string;
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgFor // Import necessary directives for *ngFor
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {
  searchQuery: string = '';
  filteredServices: Service[] = [];

  healthServices: Service[] = [
    { name: 'Medical services', route: '/medical-services' },
    { name: 'Specialists', route: '/specialists' },
    { name: 'My health Records', route: '/health-records' },
    { name: 'My appointments', route: '/appointments' },
    { name: 'Teleclinics', route: '/teleclinics' },
    { name: 'Payments', route: '/payments' },
    { name: 'Customer care', route: '/customer-care' },
    { name: 'Other services', route: '/other-services' },
  ];

  constructor(private router: Router) {}

  handleSearch(): void {
    if (this.searchQuery) {
      this.filteredServices = this.healthServices.filter((service) =>
        service.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredServices = [];
    }
  }

  handleClick(route: string): void {
    this.router.navigate([route]);
  }
}
