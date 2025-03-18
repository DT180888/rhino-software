import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    name: 'Guest',
    avatar: 'assets/images/avatar.png',
    role: 'Guest',
  };

  navigationItems = [
    { label: 'Trang chủ', path: '/landing/home', active: false },
    { label: 'Sản phẩm', path: '/landing/products', active: false },
    { label: 'Phần mềm', path: '/landing/software', active: false },
    { label: 'Bảng giá', path: '/landing/pricing', active: false },
  ];

  // // Profile menu items
  // profileMenu: Route[] = [
  //   {
  //     label: 'Bảng quản lý',
  //     path: '/dashboard',
  //     role: ['ADMIN', 'MANAGER', 'CUSTOMER'],
  //   },
  //   {
  //     label: 'Hồ sơ của bạn',
  //     path: '/profile',
  //   },
  //   {
  //     label: 'Cài đặt',
  //     path: '/settings',
  //   },
  //   {
  //     label: 'Đăng xuất',
  //     path: '/auth/sign-in',
  //     action: (): void => {
  //       this.authService.logOut(true);
  //     },
  //   },
  // ];

  constructor(
    private router: Router, 
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveRoute(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {}

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

  handleMenuItemClick(route: Route): void {
    if (route.action) {
      route.action();
    } else {
      void this.router.navigate([route.path]);
    }
    this.isDropdownOpen = false;
  }
}