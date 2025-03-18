import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Nfts', route: '/dashboard/dashboard/nfts' },
            { label: 'Khách hàng', route: '/dashboard/dashboard/user' },
            // { label: 'Podcast', route: '/dashboard/podcast' },
            { label: 'Thiết bị', route: '/dashboard/dashboard/devices' },
            { label: 'Gói dịch vụ', route: '/dashboard/dashboard/subscriptions' }
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            //{ label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
      ],
    },
  ];
}
