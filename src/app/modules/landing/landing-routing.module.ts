import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { Printer3dComponent } from './pages/printer3d/printer3d.component';
import { Scan3dComponent } from './pages/scan3d/scan3d.component';
import { Texu2fComponent } from './pages/scan3d/pages/texu2f/texu2f.component';
import { Texu3wComponent } from './pages/scan3d/pages/texu3w/texu3w.component';
import { Texut22Component } from './pages/scan3d/pages/texut22/texut22.component';
import { Texu630wComponent } from './pages/scan3d/pages/texu630w/texu630w.component';
import { VoxelDanceComponent } from './pages/voxel-dance/voxel-dance.component';
import { OrangeRhinoComponent } from './pages/orange-rhino/orange-rhino.component';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'rhino', component: FeaturesComponent },
      { path: 'printer3d', component: Printer3dComponent },
      { path: 'scan3d', component: Scan3dComponent },
      { path: 'scan3d/texu2f', component: Texu2fComponent },
      { path: 'scan3d/texu3w', component: Texu3wComponent },
      { path: 'scan3d/texut22', component: Texut22Component },
      { path: 'scan3d/texu630w', component: Texu630wComponent },
      { path: 'voxel-dance', component: VoxelDanceComponent },
      { path: 'orange-rhino', component: OrangeRhinoComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
