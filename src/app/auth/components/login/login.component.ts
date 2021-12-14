import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UxService } from 'src/app/service/ux.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private uxService: UxService) { }
  
  ngOnInit(): void { }

  name:     string = '';
  email:    string = '';
  password: string = '';

  form = {
    recordarUser: false
  }

  login() {
    this.uxService.Loading('Verificando');
    this.authService.login(this.email, this.password)
      .then(() => {
        this.uxService.finishLoading();
        setTimeout(() => {
          this.router.navigate(['/']);
          this.uxService.Toast('Bienvenido a FotoAD! 🔥', 1000);
        }, 500);
      })
      .catch((error) => {
        this.uxService.finishLoading();
        if (error.code === "auth/wrong-password") {
          this.uxService.Toasterror('Contraseña incorrecta 😥', 1000);
        } else if (error.code === "auth/invalid-email") {
          this.uxService.Toasterror('Correo electrónico y contraseña son necesarios 😢', 1000);
        } else if (error.code === "auth/internal-error") {
          this.uxService.Toasterror('Falta la contraseña  🔑', 1000);
        } else if (error.code === 'auth/user-not-found') {
          this.uxService.Toasterror(`No hay ningún registro de usuario que corresponda a este identificador 😢.`, 2000);
        } else if (error.code === 'auth/too-many-requests') {
          this.uxService.Toasterror(`Acceso inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Restablesca su contraseña o intente más tarde. 😢.`, 9000);
        }
      });
  }

  googleLogin() {
    this.uxService.Loading('Verificando');
    this.authService.googleLogin()
      .then(() => {
        this.router.navigateByUrl('/');
        setTimeout(() => {
          this.uxService.Toast('Bienvenido a FotoAD! 🔥', 1000);
        }, 500);
        this.uxService.finishLoading();
      })
      .catch((error) => {
        this.uxService.finishLoading();
        if (error.code === 'auth/popup-closed-by-user') {

        } else {
          this.uxService.Toasterror('Algo salio mal 😢, reintente de nuevo', 1000);
        }
      });
  }
}
