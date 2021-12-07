import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.fireAuth.user
      .subscribe((user) => {
        this.name = user?.displayName
        this.photo = user?.photoURL
      })
  }

  cerrarSesion() {
    this.authService.logout();
  }

  name: any
  photo: any
  
}
