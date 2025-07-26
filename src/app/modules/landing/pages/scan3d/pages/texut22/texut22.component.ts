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
  selector: 'app-texu-t22',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './texut22.component.html'
})
export class Texut22Component {
  showMobileMenu = false;
  currentSlide = 0;

  // Các hàm cho menu mobile và slider
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

  // Menu items (tương tự như trang TEXU 3W)
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
    { name: 'TEXU 2F', link: '/products/texu-2f', imageUrl: 'assets/images/texu-2f.png', description: '' },
    { name: 'TEXU 3W', link: '/products/texu-3w', imageUrl: 'assets/images/texu-3w.png', description: '' },
    { name: 'Texu T22+', link: '/products/texu-t22', imageUrl: 'assets/images/texu-T22.png', description: '' },
    { name: 'TEXU 630W', link: '/products/texu-630w', imageUrl: 'assets/images/texu-630W.png', description: '' }
  ];

  // Các sản phẩm liên quan (slider)
  relatedProducts: Product[] = [
    {
      name: 'TEXU 2F',
      imageUrl: 'assets/images/texu-2f.png',
      description: 'Máy quét 3D cầm tay, nhỏ gọn, dễ sử dụng, phù hợp cho người mới bắt đầu.',
      link: 'landing/scan3d/texu2f'
    },
    {
      name: 'TEXU 3W',
      imageUrl: 'assets/images/texu-3w.png',
      description: 'Máy quét 3D ánh sáng trắng, độ chính xác cao, quét nhanh và thuận tiện.',
      link: 'landing/scan3d/texu3w'
    },
    {
      name: 'TEXU 630W',
      imageUrl: 'assets/images/texu-630W.png',
      description: 'Chuyên scan 3D cho ngành giày dép, cơ khí, và các ứng dụng công nghiệp.',
      link: 'landing/scan3d/texu630w'
    }
  ];

  // Thông tin chính về sản phẩm T22+
  product = {
    name: 'TEXU T22+',
    imageUrl: 'assets/images/texu-T22.png',  // Bạn thay đường dẫn hình theo ý bạn
    tagline: 'Máy quét 3D cầm tay bằng laser xanh, tốc độ cao và chính xác tới 0.02mm.',
    description: `
      TEXU T22+ là thiết bị quét laser 3D cầm tay với 11+7 tia laser xanh và 1 tia quét bổ sung, 
      đem đến khả năng quét nhanh với tốc độ 2.020.000 phép đo mỗi giây. 
      Độ phân giải tới 0.02mm, đáp ứng các nhu cầu cao nhất cho ngành kỹ thuật và kiểm tra chất lượng.
    `,
    rating: 4.9,
    specs: {
      accuracy: '0.02mm',
      scanRange: '0.1m - 4m',
      scanSpeed: '2,020,000 phép đo/s'
    }
  };
}
