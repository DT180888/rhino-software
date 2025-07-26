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

@Component({
  selector: 'app-texu3w',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './texu3w.component.html'
})
export class Texu3wComponent {
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
      name: 'TEXU 2F',
      imageUrl: 'assets/images/texu-2f.png',
      description: 'Máy quét 3D cầm tay, nhỏ gọn, dễ sử dụng, phù hợp cho người mới bắt đầu.',
      link: 'landing/scan3d/texu2f'
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
    name: 'TEXU 3W',
    imageUrl: 'assets/images/texu-3w.png',
    tagline: 'Thiết bị quét 3D chuyên nghiệp với độ chính xác lên đến 0.04mm, công nghệ ánh sáng trắng có cấu trúc.',
    description: 'Thiết bị quét 3D chuyên nghiệp cho độ chính xác cao, phù hợp cho ngành kỹ thuật.',
    rating: 4.9,
    specs: {
      accuracy: '±0.05mm',
      scanRange: '0.1m - 4m',
      scanSpeed: '500,000 điểm/giây'
    }
  };
}