// menu.service.ts
import { Injectable, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { Menu } from '../../constants/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebar = signal<boolean>(true);
  private _pagesMenu = signal<MenuItem[]>([]);
  private _subscription = new Subscription();

  constructor(private router: Router) {
    this._pagesMenu.set(Menu.pages);

    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route ?? null);
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription.add(sub);
  }

  get showSideBar(): boolean {
    return this._showSidebar();
  }

  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }

  get pagesMenu(): MenuItem[] {
    return this._pagesMenu();
  }

  public toggleSidebar(): void {
    const currentValue = this._showSidebar();
    this._showSidebar.set(!currentValue);
  }

  public toggleMenu(item: SubMenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  private expand(items: Array<SubMenuItem>): void {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route ?? null);
      if (item.children) this.expand(item.children);
    });
  }

  private isActive(instruction: string | null): boolean {
    if (!instruction) return false;
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}