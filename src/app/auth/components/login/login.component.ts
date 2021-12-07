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

  name:     string = '';
  email:    string = '';
  password: string = '';

  form = {
    recordarUser: false
  }

  login() {
    this.authService.login(this.email, this.password);
  }

  googleLogin() {
    this.authService.googleLogin();
  }
}
