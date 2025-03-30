import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  link: string;
}

interface Product {
  name: string;
  imageUrl: string;
  description: string;
  link?: string;
}

interface Specification {
  title: string;
  description: string;
  icon: string;
  details: {
    name: string;
    value: string;
  }[];
}

@Component({
  selector: 'app-texu2f',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './texu2f.component.html'
})
export class Texu2fComponent {
  showMobileMenu = false;
  currentSlide = 0;

  // Functions for mobile menu and slider
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.relatedProducts.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide === this.relatedProducts.length - 1 ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Menu items
  menuItems: MenuItem[] = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Sản phẩm', link: '/products' },
    { name: 'Dịch vụ', link: '/services' },
    { name: 'Ứng dụng', link: '/applications' },
    { name: 'Giới thiệu', link: '/about' },
    { name: 'Liên hệ', link: '/contact' }
  ];

  // Footer links
  footerLinks: MenuItem[] = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Sản phẩm', link: '/products' },
    { name: 'Dịch vụ', link: '/services' },
    { name: 'Giới thiệu', link: '/about' },
    { name: 'Tin tức', link: '/news' },
    { name: 'Liên hệ', link: '/contact' }
  ];

  // Other products for footer
  otherProducts: Product[] = [
    { name: 'TEXU 2F', link: 'landing/scan3d/texu2f', imageUrl: 'assets/images/texu-2f.png', description: '' },
    { name: 'TEXU 3W', link: 'landing/scan3d/texu3w', imageUrl: 'assets/images/texu-3w.png', description: '' },
    { name: 'Texu T22+', link: 'landing/scan3d/texut22', imageUrl: 'assets/images/texu-T22.png', description: '' },
    { name: 'TEXU 630W', link: 'landing/scan3d/texu630w', imageUrl: 'assets/images/texu-630W.png', description: '' }
  ];

  // Related products for slider
  relatedProducts: Product[] = [
    {
      name: 'TEXU 3W',
      imageUrl: 'assets/images/texu-3w.png',
      description: 'Thiết bị quét 3D chuyên nghiệp cho độ chính xác cao, phù hợp cho ngành kỹ thuật.',
      link: 'landing/scan3d/texu3w'
    },
    {
      name: 'Texu T22+',
      imageUrl: 'assets/images/texu-T22.png',
      description: 'Máy quét 3D cầm tay bằng laser, tốc độ quét nhanh, cho kết quả chính xác và chi tiết.',
      link: 'landing/scan3d/texut22'
    },
    {
      name: 'TEXU 630W',
      imageUrl: 'assets/images/texu-630W.png',
      description: 'Chuyên scan 3D cho ngành giày dép, cơ khí, và các ứng dụng công nghiệp.',
      link: 'landing/scan3d/texu630w'
    }
  ];

  // Main product data
  product = {
    name: 'TEXU 2F',
    imageUrl: 'assets/images/texu-2f.png',
    tagline: 'Máy quét 3D cầm tay, nhỏ gọn, dễ sử dụng, phù hợp cho người mới bắt đầu với độ chính xác cao.',
    description: 'Máy quét 3D cầm tay, nhỏ gọn, dễ sử dụng, phù hợp cho người mới bắt đầu.',
    rating: 4.8,
    isNew: true,
    specs: {
      accuracy: '±0.1mm',
      scanRange: '0.2m - 2m',
      scanSpeed: '300,000 điểm/giây'
    }
  };

  // Technical specifications
  specifications: Specification[] = [
    {
      title: 'Hiệu suất quét',
      description: 'Tốc độ và độ chính xác vượt trội',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      details: [
        { name: 'Độ chính xác quét', value: '0.05 - 0.1 mm' },
        { name: 'Độ phân giải', value: '0.05 mm' },
        { name: 'Tốc độ quét', value: '500.000 điểm/giây' },
        { name: 'Phạm vi làm việc', value: '200 - 500 mm' }
      ]
    },
    {
      title: 'Kết nối & Lưu trữ',
      description: 'Tích hợp liền mạch với hệ thống của bạn',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      details: [
        { name: 'Kết nối', value: 'USB 3.0' },
        { name: 'Yêu cầu hệ thống', value: 'CPU i7+, RAM 16GB,Win10 64' },
        { name: 'Định dạng xuất', value: 'OBJ, STL, ASC, PLY.P3' },
        { name: 'Phần mềm', value: 'TEXU Scan Pro' }
      ]
    },
    {
      title: 'Thiết kế & Công thái học',
      description: 'Tối ưu trải nghiệm người dùng',
      icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
      details: [
        { name: 'Trọng lượng', value: '0.8 kg' },
        { name: 'Nhiệt độ hoạt động', value: '0 - 40 °C' },
        { name: 'Loại nguồn sáng', value: '3 màu LED (Class I eye-safe)' },
        { name: 'Trường nhìn (FOV)', value: '60 × 50 mm' }
      ]
    }
  ];
}