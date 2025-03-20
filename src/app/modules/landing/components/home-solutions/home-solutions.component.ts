// app-home-solutions.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-solutions',
  templateUrl: './home-solutions.component.html',
})
export class HomeSolutionsComponent {
  products = [
    {
      name: 'Rhino 8',
      description: 'Công cụ tạo mô hình 3D linh hoạt nhất, hỗ trợ Windows và macOS.',
      link: 'https://www.rhino3d.com/',
    },
    {
      name: 'Orang-Rhino',
      description: 'Giải pháp tối ưu hóa video và nội dung mô hình 3D.',
      link: '#',
    },
    {
      name: 'RhinoCAM',
      description: 'Phần mềm CAM tích hợp cho gia công chính xác.',
      link: 'https://mecsoft.com/products/rhinocam/',
    },
    {
      name: 'VoxelDance',
      description: 'Công cụ xử lý dữ liệu in 3D mạnh mẽ.',
      link: '#',
    },
  ];
}