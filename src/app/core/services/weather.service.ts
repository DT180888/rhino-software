import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface WeatherData {
  temperature: number;
  location: string;
  description: string;
  condition: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Get a free API key from openweathermap.org
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getCurrentWeather(): Observable<WeatherData> {
    // Option 1: Use real API with geolocation
    // return this.getCurrentLocation().pipe(
    //   switchMap(position => this.getWeatherByCoordinates(position.coords.latitude, position.coords.longitude)),
    //   catchError(() => this.getMockWeather())
    // );

    // Option 2: Use mock weather data for development
    return this.getMockWeather();
  }

  private getWeatherByCoordinates(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map((response) => ({
        temperature: Math.round(response.main.temp),
        location: response.name,
        description: response.weather[0].description,
        condition: this.mapWeatherCode(response.weather[0].id),
      })),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        return this.getMockWeather();
      }),
    );
  }

  private getCurrentLocation(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          },
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  private getMockWeather(): Observable<WeatherData> {
    // Generate random temperature between 15 and 30
    const temp = Math.floor(Math.random() * 15) + 15;

    // Pick a random condition
    const conditions = ['sunny', 'cloudy', 'partly-cloudy', 'rainy'];
    const conditionIndex = Math.floor(Math.random() * conditions.length);
    const condition = conditions[conditionIndex];

    // Corresponding descriptions
    const descriptions = ['Clear sky', 'Cloudy', 'Partly cloudy', 'Light rain'];

    return of({
      temperature: temp,
      location: 'TP. Hồ Chí Minh',
      description: descriptions[conditionIndex],
      condition: condition,
    });
  }

  private mapWeatherCode(code: number): string {
    // Map OpenWeatherMap condition codes to our simplified conditions
    // https://openweathermap.org/weather-conditions
    if (code >= 200 && code < 300) return 'stormy'; // Thunderstorm
    if (code >= 300 && code < 400) return 'rainy'; // Drizzle
    if (code >= 500 && code < 600) return 'rainy'; // Rain
    if (code >= 600 && code < 700) return 'snowy'; // Snow
    if (code >= 700 && code < 800) return 'cloudy'; // Atmosphere (fog, mist, etc.)
    if (code === 800) return 'sunny'; // Clear
    if (code > 800) return 'cloudy'; // Clouds
    return 'sunny'; // Default
  }
}
