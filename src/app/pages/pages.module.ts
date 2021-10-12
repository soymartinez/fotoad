import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ExploreComponent } from './components/explore/explore.component';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    HomeComponent,
    CategoriesComponent,
    ExploreComponent,
    UserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
