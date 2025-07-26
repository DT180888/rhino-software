import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Product {
  name: string;
  imageUrl: string;
  description: string;
  learnMoreLink?: string;
  contactLink?: string;
  rating?: number;
  isNew?: boolean;
  specs?: {
    accuracy?: string;
    scanRange?: string;
    scanSpeed?: string;
  };
}

interface MenuItem {
  name: string;
  link: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Industry {
  name: string;
  description: string;
  imageUrl: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  comment: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-scan3d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scan3d.component.html',
  styleUrl: './scan3d.component.scss'
})
export class Scan3dComponent {
  showMobileMenu = false;

  // Menu items
  menuItems: MenuItem[] = [
    { name: 'Trang chủ', link: '#' },
    { name: 'Sản phẩm', link: '#products' },
    { name: 'Dịch vụ', link: '#services' },
    { name: 'Ứng dụng', link: '#industries' },
    { name: 'Giới thiệu', link: '#about' },
    { name: 'Liên hệ', link: '#contact-form' }
  ];

  // Danh sách tính năng
  features: Feature[] = [
    {
      title: 'Độ chính xác cao',
      description: 'Công nghệ quét 3D tiên tiến với độ chính xác đến ±0.03mm, đảm bảo kết quả tốt nhất.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Tốc độ nhanh',
      description: 'Tốc độ quét nhanh chóng, tiết kiệm thời gian và tăng hiệu quả làm việc của bạn.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      title: 'Dễ dàng sử dụng',
      description: 'Thiết kế thân thiện, dễ sử dụng với phần mềm trực quan, phù hợp với nhiều đối tượng.',
      icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
    }
  ];

  // Danh sách sản phẩm 3D Scanner
  products: Product[] = [
    {
      name: 'TEXU 2F',
      imageUrl: 'assets/images/texu-2f.png',
      description: 'Máy quét 3D cầm tay, nhỏ gọn, dễ sử dụng, phù hợp cho người mới bắt đầu.',
      learnMoreLink: 'landing/scan3d/texu2f',
      contactLink: '#',
      rating: 4.8,
      isNew: true,
      specs: {
        accuracy: '±0.1mm',
        scanRange: '0.2m - 2m',
        scanSpeed: '500,000 điểm/giây'
      }
    },
    {
      name: 'TEXU 3W',
      imageUrl: 'assets/images/texu-3w.png',
      description: 'Thiết bị quét 3D chuyên nghiệp cho độ chính xác cao, phù hợp cho ngành kỹ thuật.',
      learnMoreLink: 'landing/scan3d/texu3w',
      contactLink: '#',
      rating: 4.9,
      specs: {
        accuracy: '0.05-0.15mm',
        scanRange: '0.1m - 4m',
        scanSpeed: '1,000,000 điểm/giây'
      }
    },
    {
      name: 'Texu T22+',
      imageUrl: 'assets/images/texu-T22.png',
      description: 'Máy quét 3D cầm tay bằng laser, tốc độ quét nhanh, cho kết quả chính xác và chi tiết.',
      learnMoreLink: 'landing/scan3d/texut22',
      contactLink: '#',
      rating: 4.7,
      specs: {
        accuracy: '±0.03mm',
        scanRange: '0.05m - 3m',
        scanSpeed: '480,000 điểm/giây'
      }
    },
    {
      name: 'TEXU 630W',
      imageUrl: 'assets/images/texu-630W.png',
      description: 'Chuyên scan 3D cho ngành giày dép, cơ khí, và các ứng dụng công nghiệp.',
      learnMoreLink: 'landing/scan3d/texu630w',
      contactLink: '#',
      rating: 4.6,
      isNew: true,
      specs: {
        accuracy: '±0.02mm',
        scanRange: '0.1m - 6m',
        scanSpeed: '2,000,000 điểm/giây'
      }
    }
  ];

  // Danh sách ngành nghề ứng dụng
  industries: Industry[] = [
    {
      name: 'Công nghiệp cơ khí',
      description: 'Ứng dụng trong kiểm tra chất lượng, thiết kế ngược, và sản xuất linh kiện.',
      imageUrl: 'assets/images/cokhi.png'
    },
    {
      name: 'Y tế & Nha khoa',
      description: 'Hỗ trợ chẩn đoán, lên kế hoạch phẫu thuật và sản xuất bộ phận giả.',
      imageUrl: 'assets/images/industry-medical.png'
    },
    {
      name: 'Giày dép & Thời trang',
      description: 'Tạo mẫu nhanh, tùy chỉnh thiết kế và kiểm tra chất lượng sản phẩm.',
      imageUrl: 'assets/images/industry-footwear.png'
    },
    {
      name: 'Kiến trúc & Di sản',
      description: 'Bảo tồn di sản văn hóa, phục dựng công trình và thiết kế kiến trúc.',
      imageUrl: 'assets/images/industry-architecture.png'
    }
  ];

  // Đánh giá từ khách hàng
  testimonials: Testimonial[] = [
    {
      name: 'Nguyễn Văn A',
      position: 'Giám đốc kỹ thuật',
      company: 'Công ty Cơ khí XYZ',
      comment: 'Máy quét 3D TEXU 3W đã giúp chúng tôi cải thiện đáng kể quy trình kiểm tra chất lượng và thiết kế ngược. Tiết kiệm tới 40% thời gian so với phương pháp truyền thống.',
      avatarUrl: 'assets/images/doctor.png'
    },
    {
      name: 'Trần Thị B',
      position: 'Nhà thiết kế',
      company: 'Studio ABC Design',
      comment: 'Thiết bị quét 3D của 3D SCAN giúp chúng tôi nắm bắt chi tiết của các mẫu thiết kế với độ chính xác tuyệt vời. Dịch vụ hỗ trợ kỹ thuật cũng rất chuyên nghiệp.',
      avatarUrl: 'assets/images/doctor.png'
    },
    {
      name: 'Lê Văn C',
      position: 'Bác sĩ',
      company: 'Bệnh viện XYZ',
      comment: 'Máy quét TEXU T22+ đã cách mạng hóa cách chúng tôi lên kế hoạch phẫu thuật. Độ chính xác và tốc độ quét đã giúp chúng tôi cải thiện đáng kể kết quả điều trị cho bệnh nhân.',
      avatarUrl: 'assets/images/doctor.png'
    }
  ];

  // Hàm mở/đóng menu mobile
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }
}