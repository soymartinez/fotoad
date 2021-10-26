import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interface/auth.interfaces';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient,
    private googleAuthService: SocialAuthService) { }


  // Login correo electrónico
  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          // Validación y almacenamiento de token en LocalStorage
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }


  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!
          }
          return resp.ok
        }),
        catchError(err => of(false))
      )
  }

  logout() {
    localStorage.removeItem('token');
    // this.googleAuthService.signOut();
  }



  // Login con Google
  signInWithGoogle(): void {
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  // Cerra sesión de Google
  signOut(): void {
    this.googleAuthService.signOut();
  }
  // Actualizar el token de autenticación de Google
  refreshToken(): void {
    this.googleAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  signStatus() {
    return this.googleAuthService.authState
  }


}
