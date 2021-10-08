import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExploreComponent } from './explore/explore.component';
import { UserComponent } from './user/user.component';



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
