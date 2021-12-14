import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { take, switchMap } from 'rxjs/internal/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UxService } from 'src/app/service/ux.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth,
              private uxService: UxService,
              private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.auth.authState
        .pipe(
          take(1),
          switchMap(async (logueado) => {
            if (logueado) {
              return true;
            } else {
              // this.uxService.Toasterror('Primero inicie sesión 🙃', 1500);
              // setTimeout(() => {
                this.router.navigateByUrl('/auth/login')
              // }, 2000);
              return false;
            }
          })
        )
  }
  
}
