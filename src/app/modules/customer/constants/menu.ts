import { MenuItem } from 'src/app/core/models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Chính',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/building-office.svg',
          label: 'Tổ chức của tôi',
          route: '/my-organization/dashboard',
        },
        {
          icon: 'assets/icons/heroicons/solid/room.svg',
          label: 'Công ty của tôi',
          route: '/my-organization/companies',
        },
        {
          icon: 'assets/icons/heroicons/solid/arrow-right-end-on-rectangle.svg',
          label: 'Lịch sử ra vào',
          route: '/my-organization/access-logs',
        },
        {
          icon: 'assets/icons/heroicons/outline/shopping-bag.svg',
          label: 'Hóa đơn',
          route: '/my-organization/orders',
        },
      ],
    },
    {
      group: 'Yêu cầu',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/solid/identification.svg',
          label: 'Duyệt ảnh nhân viên',
          route: '/my-organization/face-approval',
        },
        {
          icon: 'assets/icons/heroicons/solid/rocket-launch.svg',
          label: 'Huấn luyện AI',
          route: '/my-organization/company-model',
        },
      ],
    },
    {
      group: 'Tùy chỉnh',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Cài đặt',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Thông báo',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Trang cá nhân',
          route: '/profiles',
        },
      ],
    },
  ];
}
