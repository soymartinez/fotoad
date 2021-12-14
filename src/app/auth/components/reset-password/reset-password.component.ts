import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UxService } from '../../../service/ux.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService,
              private uxService: UxService,
              private router: Router) { }

  ngOnInit(): void {
  }

  email = ''

  resetPassword() {
    this.uxService.Loading('Enviando correo de recuperación');
    this.authService.resetPassword(this.email)
      .then(() => {
        this.uxService.finishLoading();
        this.uxService.Toast(`Recuperación de contraseña enviada a 👀  ${this.email}`, 4000);
        setTimeout(() => {
          this.router.navigate(['/auth'])
        }, 4000);
      })
      .catch((error) => {
        this.uxService.finishLoading();
        if (error.code === 'auth/invalid-email') {
          this.uxService.Toasterror('Correo electrónico necesario 👻', 1000);
        } else {
          this.uxService.Toasterror('No te encontramos en nuestra base de datos 😢', 1000);
        }
      });
  }
}
