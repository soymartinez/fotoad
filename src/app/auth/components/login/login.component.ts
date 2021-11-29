import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void { }

  credenciales = {
    name: '',
    email: '',
    password: ''
  }

  login() {
    this.authService.login(this.credenciales.email, this.credenciales.password);
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  register() {
    this.authService.register(this.credenciales.name, this.credenciales.email, this.credenciales.password);
  }
}
