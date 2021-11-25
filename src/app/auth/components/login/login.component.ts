import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { SocialUser  } from "angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  mensaje = '';
  user!: SocialUser;
  loggedIn: boolean = true;

  constructor( private fb: FormBuilder, 
               private router: Router,
               private authService: AuthService ) { }
  
  ngOnInit(): void {
    this.authService.signStatus().subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  // Validar los campos del formulario
  miFormulario: FormGroup = this.fb.group({
    email:    ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  }) 

  // Login con correo electronico
  login() {
    this.router.navigateByUrl('/');
    // console.log(this.miFormulario.value);
    // const { email, password } = this.miFormulario.value;
    
    // // Validación de usaurio con el "ok": true
    // this.authService.login( email, password )
    //   .subscribe( ok => {

        
    //     // if ( ok === true ) {
    //     //   this.router.navigateByUrl('/pages/home')
    //     // } else {
    //     //   Swal.fire({
    //     //     icon: 'error',
    //     //     iconColor: '#D36B43',
    //     //     title: 'Error',
    //     //     text: ok,
    //     //     width: '22rem',
    //     //     confirmButtonColor: '#D36B43'
    //     //   })
    //     // }
    //   })
  }

  // Login con Google
  loginGoogle() {
    this.authService.signInWithGoogle();    
  }
  

}
