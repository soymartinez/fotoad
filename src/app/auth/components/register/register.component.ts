import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/interface';
import { DataService } from 'src/app/service/data.service';
import { UxService } from 'src/app/service/ux.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
                private router: Router,
                private uxService: UxService,
                private dataService: DataService) { }

  ngOnInit(): void {
  }

  credenciales = {
    name: '',
    email: '',
    password: ''
  }

  form = {
    condiciones: false
  }

  register() {
    this.uxService.Loading('Registrando');
    if (this.form.condiciones) {
      if (!(this.credenciales.name === '')) {
        this.authService.register(this.credenciales.email, this.credenciales.password)
          .then(async value => {
            console.log('antes', value.user?.photoURL);

            await value.user?.updateProfile({
              displayName: this.credenciales.name,
              photoURL: value.user?.photoURL! || this.authService.defaultIcon
            }).then(() => {
              console.log('despues', value.user?.photoURL);

              const data: Usuario = {
                uid: value.user?.uid,
                nombre: value.user?.displayName!,
                email: value.user?.email!,
                foto: value.user?.photoURL!,
                rol: 'Usuario'
              }
              this.dataService.crearDoc(data, 'usuarios', this.credenciales.email)
            })
            this.uxService.finishLoading();
            this.router.navigateByUrl('/');
            this.uxService.Toast('Registrado en FotoAD, Bienvenido! 😊', 1000);
          })
          .catch((error) => {
            this.uxService.finishLoading();
            if (error.code === "auth/wrong-password") {
              this.uxService.Toasterror('Contraseña incorrecta 😥', 1000);
            } else if (error.code === "auth/invalid-email") {
              this.uxService.Toasterror('Correo electrónico y contraseña son necesarios 😢', 1000);
            } else if (error.code === 'auth/missing-email') {
              this.uxService.Toasterror('Falta el correo electrónico 😑', 1000);
            } else if (error.code === "auth/internal-error") {
              this.uxService.Toasterror('Falta la contraseña  🔑', 1000);
            } else if (error.code === 'auth/email-already-in-use') {
              this.uxService.Toasterror('El correo electrónico ya esta en uso. 😑', 1000);
            }
          });
      } else {
        this.uxService.Toasterror('Faltan campos por llenar 😑', 1000);
      }
    } else {
      this.uxService.Toasterror('Acepte los terminos y condiciones 👀', 1000);
    }
  }

  googleRegister() {
    this.uxService.Loading('Verificando');
    this.authService.googleLogin()
      .then(async value => {
        console.log(value.user);
        const data: Usuario = {
          uid: value.user?.uid,
          nombre: value.user?.displayName!,
          email: value.user?.email!,
          foto: value.user?.photoURL!,
          rol: 'Usuario'
        }
        this.dataService.crearDoc(data, 'usuarios', data.email)
        this.router.navigateByUrl('/');
        setTimeout(() => {
          this.uxService.Toast('Bienvenido a FotoAD! 🔥', 1000);
        }, 500);
        this.uxService.finishLoading();
      })
      .catch((error) => {
        this.uxService.finishLoading();
        if (error.code === 'auth/popup-closed-by-user') { }
        else {
          this.uxService.Toasterror('Algo salio mal 😢, reintente de nuevo', 1000);
        }
      });
  }
}
