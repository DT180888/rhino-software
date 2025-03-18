import { Component } from '@angular/core';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeFooterComponent } from "./home-footer/home-footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [HomeHeaderComponent, HomeFooterComponent, RouterModule],
})
export class HomePageComponent {

}
