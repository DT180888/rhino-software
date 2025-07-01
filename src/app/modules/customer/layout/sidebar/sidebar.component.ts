import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Subscription, interval } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

interface WeatherData {
  temperature: number;
  location: string;
  description: string;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
}

interface UserData {
  name: string;
  avatar: string;
  role: string;
}

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class CustomerSidebarComponent implements OnInit, OnDestroy {
  // Company information
  companyLogo: string = 'assets/images/adsfo_logo.png';
  companyName: string = 'ADSFO';

  // User information
  currentUser: UserData = {
    name: '',
    avatar: '',
    role: '',
  };

  // Weather information
  weather: WeatherData = {
    temperature: 0,
    location: '',
    description: '',
    condition: 'sunny',
  };

  // Time
  currentTime: Date = new Date();
  private clockSubscription: Subscription | null = null;

  constructor(
    public menuService: MenuService,
    private router: Router,
    private authService: AuthenticationService,
    private weatherService: WeatherService,
  ) {}

  ngOnInit(): void {
    // Get current user data
    this.getCurrentUser();

    // Get weather data
    this.getWeather();

    // Start clock
    this.startClock();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
  }

  toggleSidebar(): void {
    this.menuService.toggleSidebar();
  }

  toggleMenu(item: SubMenuItem): void {
    this.menuService.toggleMenu(item);
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }

  getWeatherIcon(): string {
    const iconMap = {
      sunny: 'assets/icons/weather/sun.svg',
      cloudy: 'assets/icons/weather/cloud.svg',
      rainy: 'assets/icons/weather/cloud-rain.svg',
      stormy: 'assets/icons/weather/cloud-lightning.svg',
      snowy: 'assets/icons/weather/snowflake.svg',
    };

    return iconMap[this.weather.condition];
  }

  private getCurrentUser(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      const email = this.authService.getEmailFromToken() || user.email || '';
      const role = this.authService.getRoleFromToken() || user.role || '';

      this.currentUser = {
        name: email.split('@')[0],
        avatar: 'assets/avatars/avt-01.jpg',
        role: role,
      };
    } else {
      this.currentUser = {
        name: 'Guest',
        avatar: 'assets/avatars/avt-01.jpg',
        role: 'Guest',
      };
    }
  }

  private getWeather(): void {
    this.weatherService.getCurrentWeather().subscribe({
      next: (data) => {
        this.weather = {
          temperature: data.temperature,
          location: data.location,
          description: data.description,
          condition: this.mapWeatherCondition(data.condition),
        };
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        // Set default values on error
        this.weather = {
          temperature: 21,
          location: 'Unknown',
          description: 'Unavailable',
          condition: 'sunny',
        };
      },
    });
  }

  private mapWeatherCondition(apiCondition: string): 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' {
    // Map API weather condition to our internal types
    const conditionMap: { [key: string]: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' } = {
      clear: 'sunny',
      sunny: 'sunny',
      'partly-cloudy': 'cloudy',
      cloudy: 'cloudy',
      overcast: 'cloudy',
      rain: 'rainy',
      drizzle: 'rainy',
      thunderstorm: 'stormy',
      snow: 'snowy',
      sleet: 'snowy',
      hail: 'snowy',
    };

    return conditionMap[apiCondition.toLowerCase()] || 'sunny';
  }

  private startClock(): void {
    // Update time every minute
    this.clockSubscription = interval(60000).subscribe(() => {
      this.currentTime = new Date();
    });
  }
}
