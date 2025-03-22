import { Component, HostListener, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Notification } from 'src/app/core/models/notification.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BaseListResponse } from 'src/app/core/models/base-response.model';
interface Route {
  path: string;
  label: string;
  action?: () => void;
}

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  showNotificationPopover = false;
  notifications: Notification[] = [];
  selectedNotification: Notification | null = null;
  showNotificationDetailModal = false;
  totalCount: number = 0;
  unreadCount = 0;
  isMobileMenuOpen = false;
  activeNotificationTab: 'all' | 'unread' = 'all';
  filteredNotifications: Notification[] = [];

  constructor(
    public menuService: MenuService,
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.fetchNotificationsInBackground();
    }
  }

  // Check authentication status
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if click is outside the burger menu and its button
    if (
      this.isMobileMenuOpen &&
      !target.closest('.mobile-menu') &&
      !target.closest('button[aria-label="Toggle menu"]')
    ) {
      this.isMobileMenuOpen = false;
    }
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/auth/sign-in']);
    this.isMobileMenuOpen = false; // Close menu after logout
  }

  // Mở/đóng dropdown
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Xử lý khi click vào 1 mục trong dropdown
  handleMenuItemClick(route: Route): void {
    if (route.action) {
      route.action();
    } else {
      void this.router.navigate([route.path]);
    }
    this.isDropdownOpen = false;
  }

  private fetchNotificationsInBackground(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (response: BaseListResponse<Notification>) => {
        if (response.success) {
          this.notifications = response.data;
          this.totalCount = response.totalCount;
          this.unreadCount = this.notifications.filter(n => !n.isRead).length;
          this.filterNotifications();
        }
      },
      error: error => {
        console.error('Error fetching notifications in background', error);
      }
    });
  }

  toggleNotificationsPopover(): void {
    this.showNotificationPopover = !this.showNotificationPopover;
    if (this.showNotificationPopover) {
      this.filterNotifications();
    }
  }

  setActiveNotificationTab(tab: 'all' | 'unread'): void {
    this.activeNotificationTab = tab;
    this.filterNotifications();
  }

  filterNotifications(): void {
    if (this.activeNotificationTab === 'all') {
      this.filteredNotifications = this.notifications;
    } else {
      this.filteredNotifications = this.notifications.filter(notification => !notification.isRead);
    }
  }

  onNotificationClick(notification: Notification): void {
    this.notificationService.markNotificationAsRead(notification.id).subscribe({
      next: () => {
        notification.isRead = true;
        this.fetchNotificationsInBackground();
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.selectedNotification = notification;
        this.showNotificationDetailModal = true;
        if (this.activeNotificationTab === 'unread') {
          this.filterNotifications();
        }
      },
      error: (err) => {
        console.error('Error marking notification as read', err);
      }
    });
  }

  closeNotificationDetailModal(): void {
    this.showNotificationDetailModal = false;
    this.selectedNotification = null;
  }
}