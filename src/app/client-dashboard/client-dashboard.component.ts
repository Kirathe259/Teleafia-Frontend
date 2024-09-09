import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    BaseChartDirective // Include BaseChartDirective
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {
  // User Profile Card
  userName = 'John Doe';
  userProfilePic = 'path_to_profile_picture.jpg'; // Update with the actual path

  // Notification Card
  appointmentDetails = {
    hospital: 'Afya Bora Hospital',
    doctor: 'Dr. Jane Smith',
    time: '10:00 AM',
    type: 'Physical' // or 'Online'
  };

  // Line Chart Data and Options
  lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [50, 60, 70, 80, 90],
        label: 'User Interaction',
        borderColor: '#C00100',
        backgroundColor: 'rgba(192, 1, 0, 0.2)',
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  // Explicitly set the type to 'line'
  lineChartType: 'line' = 'line';

  // Donut Chart Data and Options
  donutChartData: ChartData<'doughnut'> = {
    labels: ['Service 1', 'Service 2', 'Service 3'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#C00100', '#FFA500', '#00FF00']
      }
    ]
  };
  donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
        }
      }
    }
  };

  // Explicitly set the type to 'doughnut'
  donutChartType: 'doughnut' = 'doughnut';

  constructor(private router: Router) {}

  handleNavigation(route: string): void {
    this.router.navigate([route]);
  }
}
