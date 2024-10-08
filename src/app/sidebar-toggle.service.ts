import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  // The sidebar state (true means open, false means closed)
  private sidebarOpen = new BehaviorSubject<boolean>(false);

  // Observable for sidebar state
  sidebarOpen$ = this.sidebarOpen.asObservable();

  // Toggle the sidebar state
  toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }

  // Set sidebar state directly
  setSidebarState(isOpen: boolean) {
    this.sidebarOpen.next(isOpen);
  }
}
