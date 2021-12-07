import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get usuario() {
    return this.authService.usuario;
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  imagenes: any[] = [];

}
