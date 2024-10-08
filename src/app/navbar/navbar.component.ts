import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarToggleService } from '../sidebar-toggle.service';  // Ensure this import path is correct

interface Notification {
  message: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSidebar = false;
  showNotifications = false;

  notifications: Notification[] = [];
  notificationCount = 0;
  searchQuery = '';

  constructor(private router: Router, private sidebarToggleService: SidebarToggleService) {}

  // Toggle Sidebar
  toggleSidebar() {
    this.sidebarToggleService.toggleSidebar();
  }

  // Toggle Notifications
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.fetchNotifications();
    }
  }

  // Fetch Notifications from backend
  fetchNotifications() {
    this.notifications = [
      { message: 'New order received' },
      { message: 'Payment processed' },
      { message: 'Update your profile' }
    ];
    this.notificationCount = this.notifications.length;
  }

  // Navigate to Profile Page
  goToProfile() {
    this.router.navigate(['/account-profile']);
  }
}
