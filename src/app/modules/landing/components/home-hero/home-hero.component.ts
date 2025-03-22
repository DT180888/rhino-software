import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1 })),
      ]),
    ]),
  ],
  styles: [
    `
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      @keyframes scroll-down {
        0% {
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, 100%);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, 100%);
          opacity: 0;
        }
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .animate-float-delayed {
        animation: float 6s ease-in-out infinite;
        animation-delay: -3s;
      }

      .animate-scroll-down {
        animation: scroll-down 2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      }
    `,
  ],
})
export class HomeHeroComponent implements OnInit, OnDestroy {
  @ViewChild('gifElement') gifElement?: ElementRef;

  private themeService = inject(ThemeService);
  isGifLoaded = false;
  currentTextIndex = 0;
  private interval: any;

  // Animation assets
  gifUrl = 'assets/videos/animation.gif';
  lottieUrl = 'assets/animations/smart-door.lottie';

  // Theme-aware getters
  get isDarkTheme(): boolean {
    return this.themeService.isDark;
  }

  heroTexts = ['Kiểm soát cửa văn phòng bạn bằng AI nhận diện FaceID', 'Biến đổi không gian làm việc của bạn'];

  ngOnInit(): void {
    this.startTextAnimation();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private startTextAnimation(): void {
    this.interval = setInterval(() => {
      this.currentTextIndex = (this.currentTextIndex + 1) % this.heroTexts.length;
    }, 4000);
  }

  onGifLoad(): void {
    this.isGifLoaded = true;
    const gif = this.gifElement?.nativeElement;
    if (gif) {
      gif.style.filter = 'contrast(1.2) brightness(1.1)';
    }
  }

  onTypewritingComplete(): void {
    if (this.currentTextIndex === 0) {
      this.currentTextIndex = 1;
    }
    this.currentTextIndex = 0;
  }
}
