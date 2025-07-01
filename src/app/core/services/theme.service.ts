import { Injectable, effect, signal } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme = signal<Theme>({ mode: 'dark', color: 'base' });

  constructor() {
    this.loadTheme();
    effect(() => {
      this.setTheme();
    });
  }

  private loadTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.theme.set(JSON.parse(theme));
    }
  }

  private setTheme(): void {
    localStorage.setItem('theme', JSON.stringify(this.theme()));
    this.setThemeClass();
  }

  public get isDark(): boolean {
    return this.theme().mode === 'dark';
  }

  private setThemeClass(): void {
    document.querySelector('html')!.className = this.theme().mode;
    document.querySelector('html')!.setAttribute('data-theme', this.theme().color);
  }
}
