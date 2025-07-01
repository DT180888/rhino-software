import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgForOf } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './landing.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TuiButton, TuiIcon, TuiLink } from '@taiga-ui/core';
import { LandingRoutingModule } from './landing-routing.module';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { TypewriterDirective } from './directive/typewriter.directive';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { provideHttpClient } from '@angular/common/http';
import { HomeSolutionsComponent } from './components/home-solutions/home-solutions.component';
import {
  Activity,
  Brain,
  Building,
  Calendar,
  CheckCircle,
  Headphones,
  LucideAngularModule,
  ScanFace,
} from 'lucide-angular';
import { HomeAboutUsComponent } from './components/home-about-us/home-about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    TypewriterDirective,
    HomeHeroComponent,
    HomeSolutionsComponent,
    HomeAboutUsComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    TuiButton,
    TuiLink,
    LandingRoutingModule,
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TuiIcon,
    AngularSvgIconModule.forRoot(),
    NgClass,
    ClickOutsideDirective,
    LucideAngularModule.pick({ ScanFace, Brain, Activity, Building, Calendar, Headphones, CheckCircle }),
  ],
  providers: [SubscriptionService, provideHttpClient()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
})
export class LandingModule {}
