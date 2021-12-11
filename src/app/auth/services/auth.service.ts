// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as auth from 'firebase/auth';
// import { UxService } from '../../service/ux.service';



// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   usuario = ''

//   constructor(private fireAuth: AngularFireAuth,
//     private router: Router,
//     public uxService: UxService) { }

//   login(email: string, password: string) {
//     if (email='') {
//       this.uxService.Toasterror('El correo electrónico y la contraseña son necesarios! 😐', 3000)
//     } else {
//       this.uxService.Loading('Verificando');
//       this.fireAuth.signInWithEmailAndPassword(email, password)
//         .then(() => {
//           console.log('Sesion iniciada!');
//           this.router.navigateByUrl('/');

//           this.uxService.finishLoading();
//           this.uxService.Toast('Bienvenido a FotoAD! 🔥', 3000);
//         })
//         .catch((error) => {
//           this.uxService.finishLoading();
//           this.uxService.Toasterror('No te encontramos en nuestra base de datos 😢', 3000);
//         });
//     }
//   }

//   // register(nombre: string, email: string, password: string) {
//   //   this.usuario = nombre;
//   //   this.uxService.Loading('Registrando');
//   //   this.fireAuth.createUserWithEmailAndPassword(email, password)
//   //     .then(value => {
//   //       console.log('Registrado', value);
//   //       this.router.navigateByUrl('/');

//   //       this.uxService.finishLoading();
//   //       this.uxService.Toast('Registrado en FotoAD, Bienvenido! 😊', 3000);
//   //     })
//   //     .catch(() => {
//   //       this.uxService.finishLoading();
//   //       this.uxService.Toasterror('Ya estas registrado con estas credenciales 😢', 3000);
//   //     });
//   // }

//   // googleLogin() {
//   //   this.uxService.Loading('Verificando');
//   //   return this.provider(new auth.GoogleAuthProvider())
//   //     .then(() => {
//   //       this.router.navigateByUrl('/');

//   //       this.uxService.finishLoading();
//   //       this.uxService.Toast('Bienvenido a FotoAD! 🔥', 3000);
//   //     })
//   //     .catch(() => {
//   //       this.uxService.finishLoading();
//   //       this.uxService.Toasterror('Algo salio mal 😢', 3000);
//   //     });
//   // }

//   // logout() {
//   //   this.uxService.Loading('Saliendo');
//   //   this.fireAuth.signOut().then(() => {
//   //     this.uxService.finishLoading();
//   //     this.uxService.Toast('Chaooo! 👋', 3000);
//   //     this.router.navigate(['/auth']);
//   //   }).catch(() => {
//   //     this.uxService.finishLoading();
//   //     this.uxService.Toasterror('Algo salio mal! 🤔', 3000);
//   //   });
//   // }

//   // // Proveedores de autenticacion
//   // private provider(provider: any) {
//   //   return this.fireAuth.signInWithPopup(provider)
//   //     .then(() => {
//   //       console.log('You have been successfully logged in!')
//   //     }).catch((error) => {
//   //       console.log(error)
//   //     })
//   // }


//   // get usuario() {
//   //   return { ...this._usuario };
//   // }
//   //
//   // Login correo electrónico
//   // login(email: string, password: string) {
//   //   const url = `${this.baseUrl}/auth`;
//   //   const body = { email, password };

//   //   return this.http.post<AuthResponse>(url, body)
//   //     .pipe(
//   //       tap(resp => {
//   //         // Validación y almacenamiento de token en LocalStorage
//   //         if (resp.ok) {
//   //           localStorage.setItem('token', resp.token!)
//   //           this._usuario = {
//   //             name: resp.name!,
//   //             uid: resp.uid!
//   //           }
//   //         }
//   //       }),
//   //       map(resp => resp.ok),
//   //       catchError(err => of(err.error.msg))
//   //     )
//   // }


//   // validarToken(): Observable<boolean> {
//   //   const url = `${this.baseUrl}/auth/renew`;
//   //   const headers = new HttpHeaders()
//   //     .set('x-token', localStorage.getItem('token') || '')

//   //   return this.http.get<AuthResponse>(url, { headers })
//   //     .pipe(
//   //       map(resp => {
//   //         localStorage.setItem('token', resp.token!)
//   //         this._usuario = {
//   //           name: resp.name!,
//   //           uid: resp.uid!
//   //         }
//   //         return resp.ok
//   //       }),
//   //       catchError(err => of(false))
//   //     )
//   // }

//   // logout() {
//   //   localStorage.removeItem('token');
//   //   // this.googleAuthService.signOut();
//   // }
// }

//Modificacion para el borrado

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { UxService } from '../../service/ux.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario = ''

  constructor(private fireAuth: AngularFireAuth,
    private router: Router,
    public uxService: UxService) { }

  login(email: string, password: string) {
    if (email='') {
      this.uxService.Toasterror('El correo electrónico y la contraseña son necesarios! 😐', 3000)
    } else {
      this.uxService.Loading('Verificando');
      this.fireAuth.signInWithEmailAndPassword(email, password)
        .then((usuario) => {
          //UNA VES LOGEADO EL USUARIO CON CORREO Y CONTRASEÑA SE GUARDA EL NOOMBRE DE USUARIO EN EL sessionStorage
          let usuarioLogeado = <string> usuario.user?.email
          sessionStorage.setItem('usuario', usuarioLogeado.slice(0,-10))
          console.log('Sesion iniciada!');
          this.router.navigateByUrl('/');

          this.uxService.finishLoading();
          this.uxService.Toast('Bienvenido a FotoAD! 🔥', 3000);
        })
        .catch((error) => {
          this.uxService.finishLoading();
          this.uxService.Toasterror('No te encontramos en nuestra base de datos 😢', 3000);
        });
    }
  }

  register(nombre: string, email: string, password: string) {
    this.usuario = nombre;
    this.uxService.Loading('Registrando');
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Registrado', value);
        this.router.navigateByUrl('/');

        this.uxService.finishLoading();
        this.uxService.Toast('Registrado en FotoAD, Bienvenido! 😊', 3000);
      })
      .catch(() => {
        this.uxService.finishLoading();
        this.uxService.Toasterror('Ya estas registrado con estas credenciales 😢', 3000);
      });
  }

  googleLogin() {
    this.uxService.Loading('Verificando');
    return this.provider(new auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl('/');

        this.uxService.finishLoading();
        this.uxService.Toast('Bienvenido a FotoAD! 🔥', 3000);
      })
      .catch(() => {
        this.uxService.finishLoading();
        this.uxService.Toasterror('Algo salio mal 😢', 3000);
      });
  }

  logout() {
    this.uxService.Loading('Saliendo');
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('usuario')
      this.uxService.finishLoading();
      this.uxService.Toast('Chaooo! 👋', 3000);
      this.router.navigate(['/auth']);
    }).catch(() => {
      this.uxService.finishLoading();
      this.uxService.Toasterror('Algo salio mal! 🤔', 3000);
    });
  }

  // Proveedores de autenticacion
  private provider(provider: any) {
    return this.fireAuth.signInWithPopup(provider)
      .then((usuario) => {
        //UNA VES LOGEADO EL USUARIO CON SU CUENTA DE GOOGLE SE GUARDA EL NOMBRE DE USUARIO EN EL sessionStorage
        let usuarioLogeado = <string> usuario.user?.email?.slice(0,-10);
        sessionStorage.setItem('usuario',usuarioLogeado)
        console.log('You have been successfully logged in!')
      }).catch((error) => {
        console.log(error)
      })
  }
}
