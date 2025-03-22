import { Component } from '@angular/core';

@Component({
  selector: 'app-home-about-us',
  templateUrl: './home-about-us.component.html',
  styleUrl: './home-about-us.component.scss',
})
export class HomeAboutUsComponent {
  stats = [
    {
      value: '10+',
      label: 'Năm Kinh Nghiệm',
      icon: 'calendar',
    },
    {
      value: '500+',
      label: 'Khách hàng toàn quốc',
      icon: 'building',
    },
    {
      value: '99.9%',
      label: 'Hoạt động hệ thống',
      icon: 'activity',
    },
    {
      value: '24/7',
      label: 'Trợ giúp',
      icon: 'headphones',
    },
  ];

  team = [
    {
      name: 'Le Thanh Hai',
      role: 'Chief Technology Officer',
      image: '/assets/avatars/avt-01.jpg',
      description: 'Expert in AI and security systems with 15+ years experience',
    },
    {
      name: 'Nguyen Le Vien Minh',
      role: 'Head of Product Development',
      image: '/assets/avatars/avt-01.jpg',
      description: 'Specializes in biometric systems and access control solutions',
    },
    {
      name: 'Nguyen Minh Huy',
      role: 'Security Solutions Architect',
      image: '/assets/avatars/avt-01.jpg',
      description: 'Leading expert in enterprise security architecture',
    },
  ];
}
