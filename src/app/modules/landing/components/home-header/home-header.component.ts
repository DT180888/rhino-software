import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseListResponse } from 'src/app/core/models/base-response.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Notification } from 'src/app/core/models/notification.model';

interface Route {
  path: string;
  label: string;
  icon?: string;
  role?: string[];
  action?: () => void;
}

interface UserData {
  name: string;
  avatar: string;
  role: string;
}

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
  animations: [
    trigger('headerAnimation', [
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
      ),
      state(
        'hidden',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        }),
      ),
      transition('visible => hidden', [animate('200ms ease-out')]),
      transition('hidden => visible', [animate('250ms ease-in')]),
    ]),
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [animate('75ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
    trigger('mobileMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
    ]),
  ],
})
export class HomeHeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isHeaderVisible = true;
  lastScrollPosition = 0;

  // User information
  currentUser: UserData = {
    name: '',
    avatar: '',
    role: '',
  };
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  showNotificationPopover = false;
  selectedNotification: Notification | null = null;
  showNotificationDetailModal = false;
  totalCount: number = 0;
  unreadCount: number = 0;
  activeNotificationTab: 'all' | 'unread' = 'all';

  navigationItems = [
    { label: 'Trang chủ', path: '/landing/home', active: false },
    { label: 'Sản phẩm', path: '/landing/products', active: false },
    { label: 'Phần mềm', path: '/landing/software', active: false },
    { label: 'Bảng giá', path: '/landing/pricing', active: false },
  ];

  // Theme colors and mode
  themeColors = [
    { name: 'base', code: '#e11d48' },
    { name: 'yellow', code: '#f59e0b' },
    { name: 'green', code: '#22c55e' },
    { name: 'blue', code: '#3b82f6' },
    { name: 'orange', code: '#ea580c' },
    { name: 'red', code: '#cc0022' },
    { name: 'violet', code: '#6d28d9' },
  ];

  // Profile menu items
  profileMenu: Route[] = [
    {
      label: 'Bảng quản lý',
      path: '/my-organization/dashboard',
      icon: './assets/icons/heroicons/outline/home.svg',
      role: ['CUSTOMER'],
    },
    {
      label: 'Hồ sơ của bạn',
      path: '/profile',
      icon: './assets/icons/heroicons/outline/user.svg',
    },
    {
      label: 'Cài đặt',
      path: '/settings',
      icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
    },
    {
      label: 'Đăng xuất',
      path: '/auth/sign-in',
      icon: './assets/icons/heroicons/outline/logout.svg',
      action: (): void => {
        this.authService.logOut(true);
      },
    },
  ];

  get userRole(): string | null {
    return this.authService.getRoleFromToken();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  get routes(): Route[] {
    if (!this.isAuthenticated) {
      return [
        {
          path: '/auth/sign-in',
          label: 'Đăng nhập',
          action: () => this.router.navigate(['/auth/sign-in']),
        },
      ];
    }

    // Filter menu items based on user role
    return this.profileMenu.filter((item) => !item.role || item.role.includes(this.userRole || ''));
  }

  constructor(private authService: AuthenticationService, private router: Router, private notificationService: NotificationService, public themeService: ThemeService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveRoute(event.urlAfterRedirects);
      }
    });
  }

  private getCurrentUser(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      const email = this.authService.getEmailFromToken() || user.email || '';
      const role = this.authService.getRoleFromToken() || user.role || '';

      this.currentUser = {
        name: email.split('@')[0],
        avatar: 'assets/avatars/avt-01.jpg',
        role: role,
      };
    } else {
      this.currentUser = {
        name: 'Guest',
        avatar: 'assets/avatars/avt-01.jpg',
        role: 'Guest',
      };
    }
  }

  ngOnInit(): void {
    this.getCurrentUser();

    if (this.isAuthenticated && this.userRole === 'ADMIN') {
      this.profileMenu = this.profileMenu.map(item => {
        if (item.label === 'Bảng quản lý') {
          return { ...item, path: '/dashboard' };
        }
        return item;
      });
    }

    if (this.isAuthenticated && this.userRole === 'MANAGER') {
      this.profileMenu = this.profileMenu.map(item => {
        if (item.label === 'Bảng quản lý') {
          return { ...item, path: '/manager' };
        }
        return item;
      });
    }

    if (this.isAuthenticated) {
      this.fetchNotificationsInBackground();
    }
  }

  private updateActiveRoute(currentPath: string): void {
    this.navigationItems = this.navigationItems.map((item) => ({
      ...item,
      active: currentPath.startsWith(item.path) && item.path !== '#',
    }));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const currentScrollPosition = window.scrollY;
    const scrollThreshold = 100;

    if (currentScrollPosition > scrollThreshold) {
      this.isHeaderVisible = currentScrollPosition < this.lastScrollPosition;
    } else {
      this.isHeaderVisible = true;
    }

    this.lastScrollPosition = currentScrollPosition;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleThemeMode(): void {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string): void {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }

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