import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    ExploreComponent,
    HomeComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
