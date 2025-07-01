import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        }),
        animate(
          '100ms ease-out',
          style({
            opacity: 1,
            transform: 'scale(1)',
          }),
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
        animate(
          '75ms ease-in',
          style({
            opacity: 0,
            transform: 'scale(0.95)',
          }),
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  accordionOpen: boolean[] = [];
  currentYear = new Date().getFullYear();

  constructor(
    public authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  toggleAccordions(index: number): void {
    this.accordionOpen[index] = !this.accordionOpen[index];
  }
}