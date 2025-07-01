import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <tui-root>
      <router-outlet></router-outlet>
    </tui-root>
  `
})
export class AppComponent {
  title = 'Angular Tailwind';

  constructor(public themeService: ThemeService) { }
}
