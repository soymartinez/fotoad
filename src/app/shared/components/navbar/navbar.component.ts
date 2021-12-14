import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UxService } from 'src/app/service/ux.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              private uxService: UxService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.getPerfil()
  }

  name: any
  photo: any

  cerrarSesion() {
    this.uxService.Loading('Saliendo');
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/auth']);
        this.uxService.finishLoading();
        this.uxService.Toast('Chaooo! 👋', 2000);
      }).catch(() => {
        this.uxService.finishLoading();
        this.uxService.Toasterror('Algo salio mal! 🤔', 1000);
      });
  }

  getPerfil() {
    this.authService.getCurrentUser()
      .then((user) => {
        this.dataService.getDoc('usuarios', user?.email!)
          .subscribe((data: any) => {            
            this.name = data.nombre,
            this.photo = data.foto || this.authService.defaultIcon
        })
      })
  }
}
