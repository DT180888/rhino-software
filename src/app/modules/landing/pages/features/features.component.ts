import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('tabChange', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FeaturesComponent implements OnInit {
  selectedTab = 0;
  selectedAccordionItem: number | null = null;
  animationDelays: number[] = [];

  ngOnInit(): void {
    // Tạo các delay ngẫu nhiên cho animation
    this.mainFeatures.forEach((_, index) => {
      this.animationDelays[index] = (index + 1) * 150; // miligiây
    });
  }

  selectTab(index: number): void {
    this.selectedTab = index;
    this.selectedAccordionItem = null; // Reset accordion when changing tabs
  }

  toggleAccordion(index: number): void {
    this.selectedAccordionItem = this.selectedAccordionItem === index ? null : index;
  }

  getAnimationDelay(index: number): string {
    return `${this.animationDelays[index]}ms`;
  }

  // Sections for the main tabs
  featuresCategories = [
    'Tổng Quan',
    'Công Cụ Mô Hình',
    'Giao Diện',
    'Kết Xuất',
    'Mắt Lưới',
    'Grasshopper',
    'Công Cụ Phát Triển'
  ];

  // Main highlighted features with images
  mainFeatures = [
    {
      title: 'ShrinkWrap',
      description: 'Tạo một lưới chặt xung quanh bất kỳ hình học nào, lý tưởng cho việc in 3D.',
      image: '/assets/images/shrinkwrap.png',
      link: 'https://www.rhino3d.com/features/shrinkwrap/'
    },
    {
      title: 'Tối Ưu Cho Mac (Metal)',
      description: 'Vẽ 3D cực nhanh, tăng tốc độ đáng kể cho người dùng làm việc trên Mac.',
      image: '/assets/images/metalmac.png',
      link: 'https://www.rhino3d.com/features/display/metal/'
    },
    {
      title: 'SubD Creases',
      description: 'Các nếp gấp SubD, rất hữu ích cho việc tạo các đặc điểm gần với fillet.',
      image: '/assets/images/subd.png',
      link: 'https://www.rhino3d.com/features/subd/'
    },
    {
      title: 'Mô Hình Đơn Giản Hóa',
      description: 'Rhino rất linh hoạt, chính xác và phổ biến nhờ các công cụ tạo mô hình tiên tiến.',
      image: '/assets/images/modelingsimplified.png',
      link: 'https://www.rhino3d.com/stories/modeling/'
    }
  ];

  // Overview section data
  overviewFeatures = [
    'Các công cụ tạo mô hình 3D cấu trúc miễn phí không giới hạn mà chỉ những phần mềm đắt hơn 20 đến 50 lần mới có. Mô hình hóa bất kỳ hình dạng nào bạn có thể tưởng tượng.',
    'Độ chính xác cần thiết để vẽ, tạo mẫu, nghiên cứu kỹ thuật, phân tích và sản xuất tất cả các loại vật thể như máy bay hoặc đồ trang sức.',
    'Khả năng tương thích với tất cả các phần mềm thiết kế, bản vẽ, CAM, kỹ thuật, phân tích, kết xuất, hoạt hình và minh họa.',
    'Đọc và sửa chữa các mắt lưới và tệp IGES rất phức tạp.',
    'Dễ học và sử dụng nên bạn có thể tập trung vào thiết kế và trực quan hóa mà không bị phân tâm bởi phần mềm.',
    'Tốc độ, ngay cả trên máy tính xách tay. Không cần cấu hình đặc biệt.',
    'Nền tảng phát triển cho hàng trăm sản phẩm 3D cụ thể.',
    'Phần cứng máy tính bình thường. Học nhanh. Giá cả phải chăng. Không có chi phí bảo trì.',
    'Đa nền tảng: Trình tạo mô hình 3D linh hoạt nhất thế giới, có sẵn trên Windows và macOS.'
  ];

  // Modeling tools section data
  modelingTools = [
    {
      title: 'Điểm',
      content: 'Điểm, đám mây điểm, lưới điểm, trích xuất đối tượng, đánh dấu (giao điểm, phân chia, kết thúc, gần nhất, tiêu điểm).'
    },
    {
      title: 'Đường Cong',
      content: 'Đường thẳng, đa tuyến, đa tuyến từ lưới, đường cong dạng tự do, hình tròn, hình cung, hình elip, hình chữ nhật, đa giác, đường xoắn ốc, hình xoắn ốc, hình nón, văn bản TrueType, nội suy điểm, điểm kiểm soát (đỉnh), phác thảo.'
    },
    {
      title: 'Đường Cong Từ Đối Tượng',
      content: 'Theo điểm, bằng đa tuyến, mở rộng, tiếp tục một đường cong, phi lê, vát, bù, trộn, trộn với một vòng cung, từ hai góc nhìn, đường cong trung gian, mặt cắt ngang, giao điểm, mức đường cong trên bề mặt NURBS hoặc lưới, phần trên bề mặt NURBS, đường viền, hình bóng, trích xuất các đường cong đẳng tham số, trích xuất sơ đồ độ cong, phép chiếu, lực hút, phác thảo, mô hình khung dây, tách phần giới hạn, bản vẽ 2D với kích thước và văn bản, làm phẳng các bề mặt có thể phát triển được.'
    },
    {
      title: 'Bề Mặt',
      content: 'Từ 3 hoặc 4 điểm, từ 3 hoặc 4 đường cong, từ các đường cong phẳng, từ mạng lưới các đường cong, hình chữ nhật, mặt phẳng biến dạng, đùn, ruy băng, điều chỉnh, bề mặt theo các phần có sự cân bằng của các tiếp tuyến, bề mặt có thể phát triển, quét dọc theo một đường ray có khả năng thích ứng cạnh, quét dọc theo 2 đường ray với cạnh liên tục, vòng quay, vòng quay dọc theo đường ray, bề mặt trung gian, kết nối, vá, treo lên, lưới điểm, trường chiều cao, phi lê, vát, bù, mặt phẳng theo điểm, văn bản TrueType và Unicode.'
    },
    {
      title: 'Chất Rắn',
      content: 'Hộp, hình cầu, hình trụ, ống, hình nón, hình nón cụt, hình chóp, hình chóp cụt, hình elip, hình xuyến, đường cong phẳng đùn, bề mặt đùn, lỗ phẳng, bề mặt nối, vùng, hợp nhất các cạnh không đa dạng, văn bản TrueType, văn bản Unicode.'
    },
    {
      title: 'Mắt Lưới',
      content: 'Từ các bề mặt NURBS, từ một đường đa tuyến khép kín, mặt có lưới, mặt phẳng, hộp, hình trụ, hình nón và hình cầu.'
    }
  ];

  // New features in Rhino 8
  newFeatures = [
    {
      icon: 'M12 6v6h4m-4 6v-6H8', // SVG path for PushPull icon
      title: 'PushPull',
      description: 'Lấy một mặt và đẩy hoặc kéo nó để đùn hoặc mở rộng. Tăng tốc độ với chức năng PushPull sử dụng các đường cong để cộng và trừ khối lượng trên bề mặt hiện có.',
      link: 'https://www.rhino3d.com/features/push-pull/'
    },
    {
      icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
      title: 'Bộ Điều Khiển',
      description: 'Ứng dụng di chuyển, chia tỷ lệ và xoay được hưởng lợi từ các tay cầm mới để mở rộng và ép đùn.',
      link: 'https://www.rhino3d.com/features/gumball/'
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Kế Hoạch C Tự Động',
      description: 'Kế hoạch C thông minh tự động điều chỉnh với các lựa chọn đủ điều kiện.',
      link: 'https://www.rhino3d.com/features/cplanes/auto-cplanes/'
    },
    {
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
      title: 'Cải Thiện Boolean',
      description: 'Các hoạt động của lưới Boolean được viết lại hoàn toàn và đáng tin cậy hơn.',
      link: 'https://www.rhino3d.com/features/meshes/mesh-booleans/'
    }
  ];

  // Interface features
  interfaceFeatures = [
    {
      title: 'Bố Cục Màn Hình',
      description: 'Tùy chỉnh, lưu, chia sẻ và khôi phục bố cục yêu thích của bạn.',
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      link: 'https://www.rhino3d.com/features/user-interface/window-layouts/'
    },
    {
      title: 'Trình Quản Lý Lớp',
      description: 'Viết lại hoàn chỉnh, trên Windows và Mac, bao gồm tất cả các tính năng mới.',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      link: 'https://www.rhino3d.com/features/user-interface/layer-manager/'
    },
    {
      title: 'Khối',
      description: 'Trình quản lý khối giờ đây linh hoạt và mạnh mẽ hơn.',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
      link: 'https://www.rhino3d.com/features/blocks/'
    },
    {
      title: 'Chế Độ Hiển Thị Mới',
      description: 'Đơn sắc, giao diện gọn gàng và tối giản, hoàn hảo để làm nổi bật tác phẩm kiến trúc.',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      link: 'https://www.rhino3d.com/features/display/display-modes/'
    }
  ];

  // Rendering features
  renderingFeatures = [
    {
      title: 'Kết Xuất Rhino',
      description: 'Công cụ Cycles được cập nhật để dò tia nhanh hơn, được tăng tốc bằng GPU.',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      link: 'https://www.rhino3d.com/features/rendering/'
    },
    {
      title: 'Bản Đồ UV',
      description: 'Bản đồ UV đã được cải tiến với trình chỉnh sửa UV nổi, các thuật toán mở ra mới, ghim và chất lượng kết cấu tốt hơn trên màn hình.',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z',
      link: 'https://www.rhino3d.com/features/rendering/uv-mapping/'
    },
    {
      title: 'Hoạ Tiết Thuật Toán',
      description: 'Hoạ tiết thuật toán gốc, trên mỗi pixel ở chế độ dò tia và kết xuất.',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      link: 'https://www.rhino3d.com/features/rendering/procedural-textures/'
    },
    {
      title: 'Kết Xuất Thực Tế',
      description: 'Tích hợp sẵn với công cụ kết xuất tiên tiến cho kết quả chân thực và nhanh chóng.',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      link: 'https://www.rhino3d.com/features/rendering/'
    }
  ];

  // Mesh features
  meshFeatures = [
    {
      title: 'MeshEnvelope',
      description: 'MeshEnvelope tạo lưới kín nước xung quanh các mắt lưới mở hoặc đóng, hình học NURBS hoặc đám mây điểm: lý tưởng để tạo mắt lưới cho in 3D.',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9v6m0 6v6',
      link: 'https://www.rhino3d.com/features/shrinkwrap/'
    },
    {
      title: 'RemeshQuad',
      description: 'Nhanh chóng tạo lưới tứ giác từ các bề mặt, khối, lưới hoặc SubD hiện có - lý tưởng để kết xuất, hoạt hình, CFD, phân tích phần tử hữu hạn và kỹ thuật đảo ngược.',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z',
      link: 'https://www.rhino3d.com/features/quadremesh/'
    },
    {
      title: 'Boolean Cải Tiến',
      description: 'Các hoạt động của lưới Boolean được viết lại hoàn toàn và đáng tin cậy hơn.',
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
      link: 'https://www.rhino3d.com/features/meshes/mesh-booleans/'
    },
    {
      title: 'Hỗ Trợ Đám Mây Điểm',
      description: 'Hỗ trợ đám mây điểm lớn cho phép làm việc với dữ liệu quét 3D phức tạp.',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      link: 'https://www.rhino3d.com/features/pointclouds/'
    }
  ];

  // Grasshopper features
  grasshopperFeatures = [
    {
      title: 'Thuộc Tính Đối Tượng',
      description: 'Quản lý thuộc tính đối tượng Rhino trực tiếp từ Grasshopper.',
      icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
      link: 'https://www.rhino3d.com/features/grasshopper/object-attributes/'
    },
    {
      title: 'Chú Thích',
      description: 'Ghi lại mô hình của bạn với các thành phần chú thích, gạch chéo và kiểu đường trong Grasshopper.',
      icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
      link: 'https://www.rhino3d.com/features/grasshopper/annotations/'
    },
    {
      title: 'Khối',
      description: 'Tạo định nghĩa và phiên bản khối trong Grasshopper.',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z',
      link: 'https://www.rhino3d.com/features/grasshopper/blocks/'
    },
    {
      title: 'Chuyển Đổi Tức Thì',
      description: 'Làm mới trực tiếp các đối tượng Rhino từ Grasshopper.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      link: 'https://www.rhino3d.com/features/grasshopper/baking/'
    }
  ];

  // Developer tools features
  developerFeatures = [
    {
      title: 'RhinoCommon (.NET)',
      description: 'SDK .NET đa nền tảng dành cho Rhino, có sẵn cho Windows, Mac, Rhino.Python và Grasshopper.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      link: 'http://developer.rhino3d.com/guides/rhinocommon/'
    },
    {
      title: 'Rhino.Python',
      description: 'Ngôn ngữ kịch bản mạnh mẽ trong Rhino trên Windows và Mac với tính linh hoạt và cú pháp rõ ràng.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      link: 'http://developer.rhino3d.com/guides/rhinopython/'
    },
    {
      title: 'Viết Kịch Bản Mới',
      description: 'Rhino 8 cung cấp nền tảng viết kịch bản và trình soạn thảo mã mới mạnh mẽ, hỗ trợ RhinoCommon (C#) và CPython.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      link: 'https://www.rhino3d.com/features/developer/scripting/'
    },
    {
      title: 'openNURBS',
      description: 'Bộ công cụ dành cho nhà phát triển openNURBS hỗ trợ các tệp 3DM gốc từ Rhino 8.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      link: 'https://www.rhino3d.com/features/developer/opennurbs'
    }
  ];
}