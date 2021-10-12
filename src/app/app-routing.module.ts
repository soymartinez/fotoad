import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './pages/components/home/home.component';
import { CategoriesComponent } from './pages/components/categories/categories.component';
import { UserComponent } from './pages/components/user/user.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
},
{
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
},
{
    path: 'registro',
    component: RegisterComponent,
    pathMatch: 'full'
},
{
    path: 'home',
    component: HomeComponent
},
{
    path: 'categorias',
    component: CategoriesComponent
},
{
    path: 'perfil/:id',
    component: UserComponent 
},
{
    path: '**',
    redirectTo: ''
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
