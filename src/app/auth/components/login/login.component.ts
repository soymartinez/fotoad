import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = ''
  password: string = ''

  constructor( public authService: AuthService ) { }

  login() {
    const user = {email: this.email, password: this.password}
    
    this.authService.login(user).subscribe( data => {
      console.log(data);
      console.log('Regresa token de conexion!');
      
    }, err => {
      console.log(err);
      console.log('No regresa token de conexion!');
      
    })
  }

  loginGG() {
    console.log(this.email + ' google');
    console.log(this.password + ' google');
  }

}
