import { MenuItem } from '../models/menu.model';

export class MenuManager {
  public static pages: MenuItem[] = [
    {
      group: 'Main',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Dashboard',
          route: '/manager/dashboard',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Khách hàng',
          route: '/manager/user-manager',
        },
        {
          icon: 'assets/icons/heroicons/outline/shopping-bag.svg',
          label: 'Đơn hàng',
          route: '/manager/order-manager',
        }
      ],
    },
    {
      group: 'Settings',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'System Settings',
          route: '/manager/system-settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/manager/notifications',
        },
      ],
    }
  ];
}
