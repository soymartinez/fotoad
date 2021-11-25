import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get usuario() {
    return this.authService.usuario;
  }

  constructor( private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  imagenes: any[] = [];

  // Cerra sesión
  cerrarSesion(): void {
    this.authService.signOut();
    this.authService.logout();

    this.router.navigateByUrl('/auth/login')
  }

}
