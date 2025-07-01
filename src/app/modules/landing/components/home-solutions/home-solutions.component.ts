// app-home-solutions.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';

interface CarouselItem {
  title: string;
  icon: string;
  type: 'list' | 'text';
  content: string[];
  checkType?: 'check' | 'cross';
}

@Component({
  selector: 'app-home-solutions',
  templateUrl: './home-solutions.component.html',
})
export class HomeSolutionsComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  autoplayInterval: any;

  carouselItems: CarouselItem[] = [
    {
      title: 'Vật liệu',
      icon: 'assets/images/rhino.png',
      type: 'list',
      content: [
        'Bộ xử lý Intel hoặc AMD 64 bit (không phải ARM)',
        'Khuyến nghị: RAM ít nhất 8 GB',
        '5 GB dung lượng trống trên ổ cứng',
        'Khuyến nghị: Card màn hình tương thích OpenGL 4.1',
        'Khuyến nghị: card màn hình có bộ nhớ ít nhất 4 GB',
        'Khuyến nghị: Nên sử dụng chuột nhiều nút có bánh xe',
        'Bộ điều hướng không gian tùy chọn',
        'Phần cứng Apple Intel với Boot Camp tùy chọn'
      ],
      checkType: 'check'
    },
    {
      title: 'Hệ điều hành Windows',
      icon: 'assets/images/rhino.png',
      type: 'list',
      content: [
        'Windows 11',
        'Windows 10'
      ],
      checkType: 'check'
    },
    {
      title: 'Kết nối Internet cho',
      icon: 'assets/images/rhino.png',
      type: 'list',
      content: [
        'Tải xuống',
        'Xác thực giấy phép',
        'Tài khoản Rhino cho:',
        'Hỗ trợ kỹ thuật trên diễn đàn',
        'Trình quản lý giấy phép của Cloud Zoo'
      ],
      checkType: 'check'
    },
    {
      title: 'Không được hỗ trợ',
      icon: 'assets/images/rhino.png',
      type: 'list',
      content: [
        'Windows 8.1 trở về trước',
        'Windows Server (bất kỳ phiên bản nào)',
        'Boot Camp trên máy Mac với Apple Silicon',
        'Các hệ thống ảo hóa như VMWare, Remote Desktop và Parallels',
        'Linux',
        'Bộ xử lý ARM được trang bị Microsoft SQ® 1 và 2'
      ],
      checkType: 'cross'
    },
    {
      title: 'Khuyến nghị của người dùng',
      icon: 'assets/images/rhino.png',
      type: 'text',
      content: [
        'Vì chúng tôi không thể kiểm tra mọi kết hợp phần cứng có thể có nên bạn có thể nhận đề xuất phần cứng từ những người dùng khác ...'
      ]
    }
  ];

  ngOnInit(): void {
    this.currentIndex = Math.floor(this.carouselItems.length / 2);
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  goToSlide(index: number): void {
    this.stopAutoplay();
    this.currentIndex = index;
  }

  prev(): void {
    this.stopAutoplay();
    this.currentIndex = this.currentIndex === 0 ? this.carouselItems.length - 1 : this.currentIndex - 1;
  }

  next(): void {
    this.stopAutoplay();
    this.currentIndex = this.currentIndex === this.carouselItems.length - 1 ? 0 : this.currentIndex + 1;
  }

  getSlideStyle(i: number): object {
    const offset = i - this.currentIndex;
    const translateX = offset * 300;
    const scale = offset === 0 ? 1 : 0.8;
    return {
      transform: `translateX(${translateX}px) scale(${scale})`
    };
  }
}