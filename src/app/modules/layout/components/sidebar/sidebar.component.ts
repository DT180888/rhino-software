import { Component } from '@angular/core';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, AngularSvgIconModule, SidebarMenuComponent, RouterLink],
})
export class SidebarComponent {
  public appJson: any = packageJson;

  constructor(public menuService: MenuService) {}

  public toggleSidebar(): void {
    this.menuService.toggleSidebar();
  }
}
