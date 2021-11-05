import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserGeneralComponent } from './components/user-general/user-general.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';

const routes: Routes = [
  { 
    path: '',
    component: UserComponent,
    children: [
      { path: 'overview', component: UserGeneralComponent },
      { path: 'profile', component: UserEditComponent },
      { path: 'change-password', component: UserPasswordComponent },
      { path: '**', redirectTo: 'overview' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
