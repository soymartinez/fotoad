import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { UxService } from '../../service/ux.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any

  constructor(public fireAuth: AngularFireAuth,
    private router: Router,
    public uxService: UxService) { }

  login(email: string, password: string) {
    this.uxService.Loading('Verificando');
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.uxService.finishLoading();
        this.router.navigate(['/']);
        setTimeout(() => {
          this.uxService.Toast('Bienvenido a FotoAD! 🔥', 2000);
        }, 500);
      })
      .catch((error) => {
        this.uxService.finishLoading();
        if (error.code === "auth/wrong-password") {
          this.uxService.Toasterror('Contraseña incorrecta 😥', 1500);
        } else if (error.code === "auth/invalid-email") {
          this.uxService.Toasterror('Correo electrónico y contraseña son necesarios 😢', 2300);
        } else if (error.code === "auth/internal-error") {
          this.uxService.Toasterror('Falta la contraseña  🔑', 1500);
        } else if (error.code === "auth/user-not-found") {
          this.uxService.Toasterror('No te encontramos en nuestra base de datos 😢. Regístrate 😎', 3000);
        } else if (error.code === 'auth/too-many-requests') {
          this.uxService.Toasterror(`Acceso inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Restablesca su contraseña o intente más tarde. 😢.`, 9000);
        }
      });
  }

  register(nombre: string, email: string, password: string, terminos: boolean) {
    this.uxService.Loading('Registrando');
    if (terminos) {
      if (!(nombre === '')) {
        this.fireAuth.createUserWithEmailAndPassword(email, password)
          .then(value => {
            console.log('Registrado', value);
            value.user?.updateProfile({
              displayName: nombre
            }).then(() => {
              this.uxService.finishLoading();
              this.router.navigateByUrl('/');
              this.uxService.Toast('Registrado en FotoAD, Bienvenido! 😊', 3000);
            })
          })
          .catch((error) => {
            this.uxService.finishLoading();
            if (error.code === "auth/wrong-password") {
              this.uxService.Toasterror('Contraseña incorrecta 😥', 3000);
            } else if (error.code === "auth/invalid-email") {
              this.uxService.Toasterror('Correo electrónico y contraseña son necesarios 😢', 3000);
            } else if (error.code === 'auth/missing-email') {
              this.uxService.Toasterror('Falta el correo electrónico 😑', 3000);
            } else if (error.code === "auth/internal-error") {
              this.uxService.Toasterror('Falta la contraseña  🔑', 3000);
            } else if (error.code === 'auth/email-already-in-use') {
              this.uxService.Toasterror('El correo electrónico ya esta en uso. 😑', 3000);
            }
          });
      } else {
        this.uxService.Toasterror('Faltan campos por llenar 😑', 2000);
      }
    } else {
      this.uxService.Toasterror('Acepte los terminos y condiciones 👀', 2000);
    }
  }

  googleLogin() {
    this.uxService.Loading('Verificando');
    this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl('/');
        this.uxService.finishLoading();
        setTimeout(() => {
          this.uxService.Toast('Bienvenido a FotoAD! 🔥', 2000);
        }, 500);
      })
      .catch((error) => {
        this.uxService.finishLoading();
        if (error.code === 'auth/popup-closed-by-user') {

        } else {
          this.uxService.Toasterror('Algo salio mal 😢, reintente de nuevo', 3000);
        }
      });
  }

  resetPassword(email: string) {
    this.uxService.Loading('Enviando correo de recuperación');
    this.fireAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.uxService.finishLoading();
        this.uxService.Toast(`Recuperación de contraseña enviada a 👀  ${email}`, 5000);
        setTimeout(() => {
          this.router.navigate(['/auth'])
        }, 4000);
      })
      .catch((error) => {
        this.uxService.finishLoading();
        if (error.code === 'auth/invalid-email') {
          this.uxService.Toasterror('Correo electrónico necesario 👻', 3000);
        } else {
          this.uxService.Toasterror('No te encontramos en nuestra base de datos 😢', 3000);
        }
      });
  }

  logout() {
    this.uxService.Loading('Saliendo');
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/auth']);
      this.uxService.finishLoading();
      this.uxService.Toast('Chaooo! 👋', 2000);
    }).catch(() => {
      this.uxService.finishLoading();
      this.uxService.Toasterror('Algo salio mal! 🤔', 2000);
    });
  }
}
