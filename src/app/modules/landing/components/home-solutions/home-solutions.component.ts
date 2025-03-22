import { Component } from '@angular/core';

@Component({
  selector: 'app-home-solutions',
  templateUrl: './home-solutions.component.html',
  styleUrl: './home-solutions.component.scss'
})
export class HomeSolutionsComponent {
  solutions = [
    {
      title: 'Kiểm Soát Truy Cập Tích Hợp AI',
      description: 'Nhận diện khuôn mặt nâng cao và học máy cho quản lý truy cập văn phòng an toàn, liền mạch',
      icon: 'brain',
      features: [
        'Nhận diện khuôn mặt thời gian thực',
        'Thuật toán học sâu',
        'Công nghệ chống giả mạo',
        'Phân tích mẫu hành vi'
      ]
    },
    {
      title: 'Nhận Diện Khuôn Mặt Thông Minh',
      description: 'Hệ thống phát hiện và xác thực khuôn mặt thế hệ mới với tính năng bảo mật dựa trên AI',
      icon: 'scan-face',
      features: [
        'Lập bản đồ khuôn mặt 3D',
        'Phát hiện khẩu trang',
        'Xác minh đa điểm',
        'Quản lý danh tính'
      ]
    },
    {
      title: 'Ghi Công Thông Minh',
      description: 'Hệ thống theo dõi ghi công tích hợp AI với giám sát và phân tích tự động',
      icon: 'activity',
      features: [
        'Phát hiện hiện diện tự động',
        'Ghi nhận ra vào bằng AI',
        'Bảng điều khiển phân tích thời gian thực',
      ]
    }
  ];
}