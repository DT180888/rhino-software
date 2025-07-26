import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  selector: 'app-texu630w',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './texu630w.component.html'
})
export class Texu630wComponent {
  showMobileMenu = false;
  currentSlide = 0;

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

  // Các sản phẩm khác (footer)
  otherProducts: Product[] = [
    { name: 'TEXU 2F', link: 'landing/scan3d/texu2f', imageUrl: 'assets/images/texu-2f.png', description: '' },
    { name: 'TEXU 3W', link: 'landing/scan3d/texu3w', imageUrl: 'assets/images/texu-3w.png', description: '' },
    { name: 'Texu T22+', link: 'landing/scan3d/texut22', imageUrl: 'assets/images/texu-T22.png', description: '' },
    { name: 'TEXU 630W', link: 'landing/scan3d/texu630w', imageUrl: 'assets/images/texu-630w.png', description: '' }
  ];

  // Các sản phẩm liên quan (slider)
  relatedProducts: Product[] = [
    {
      name: 'TEXU 2F',
      imageUrl: 'assets/images/texu-2f.png',
      description: 'Máy quét 3D cầm tay, nhỏ gọn, dễ sử dụng.',
      link: 'landing/scan3d/texu2f'
    },
    {
      name: 'TEXU 3W',
      imageUrl: 'assets/images/texu-3w.png',
      description: 'Máy quét 3D ánh sáng trắng, tốc độ nhanh.',
      link: 'landing/scan3d/texu3w'
    },
    {
      name: 'TEXU T22+',
      imageUrl: 'assets/images/texu-T22.png',
      description: 'Máy quét 3D laser xanh, chính xác tới 0.02mm.',
      link: 'landing/scan3d/texut22'
    }
  ];

  // Thông tin chính của sản phẩm TEXU 630W
  product = {
    name: 'TEXU 630W',
    imageUrl: 'assets/images/texu-630W.png',
    tagline: 'Máy quét 3D LED cầm tay, đa dạng chế độ quét (song mục, tứ mục)',
    description: `
      TEXU 630W là dòng máy quét 3D sử dụng nguồn sáng LED flash, tốc độ nhanh (<2s), 
      cung cấp nhiều tùy chọn phạm vi quét từ 50mm đến 400mm. 
      Hỗ trợ đo lường không tiếp xúc, thích hợp cho nhiều ngành công nghiệp khác nhau.
    `
  };
}
