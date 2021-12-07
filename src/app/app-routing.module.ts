import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
        // canActivate: [ AuthGuard ]
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then( m => m.AccountModule ),
        canActivate: [ AuthGuard ]
    },
    {
        path: '',
        loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule ),
        canActivate: [ AuthGuard ]
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
