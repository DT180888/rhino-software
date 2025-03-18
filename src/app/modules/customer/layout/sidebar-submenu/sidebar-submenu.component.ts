// customer-sidebar-submenu.component.ts
import { Component, Input } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-customer-sidebar-submenu',
  templateUrl: './sidebar-submenu.component.html',
  animations: [
    trigger('submenuAnimation', [
      state('collapsed', style({
        height: '0',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class CustomerSidebarSubmenuComponent {
  @Input() submenu!: SubMenuItem;

  constructor(public menuService: MenuService) {}

  toggleMenu(menu: SubMenuItem): void {
    this.menuService.toggleMenu(menu);
  }
}