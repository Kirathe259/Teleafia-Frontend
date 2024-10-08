import { Component, OnInit } from '@angular/core';  // OnInit added here
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { SidebarToggleService } from '../sidebar-toggle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
  ]
})
export class SidebarComponent implements OnInit {
  brightnessMode = false;
  fullscreenMode = false;
  isSidebarOpen = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sidebarToggleService: SidebarToggleService
  ) {}

  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('Refresh-Token', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('Refresh-Token');
  }

  async handleLogout(): Promise<void> {
    try {
      const accessToken = this.getAccessToken();
      const refreshToken = this.getRefreshToken();
      const response = await this.http.post('https://b87f-102-210-244-74.ngrok-free.app/api/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': `Bearer ${refreshToken}`
        }
      }).toPromise();
      if (response) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('Refresh-Token');
        this.router.navigate(['/login']);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  handleNavigation(route: string): void {
    if (route === '/light-mode') {
      this.brightnessMode = !this.brightnessMode;
    } else {
      this.router.navigate([route]);
    }
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.fullscreenMode = !this.fullscreenMode;
  }

  ngOnInit() {
    // Subscribe to sidebar state
    this.sidebarToggleService.sidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
}
