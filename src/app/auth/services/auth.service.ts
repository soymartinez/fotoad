import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { UxService } from '../../service/ux.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  defaultIcon: string = `https://firebasestorage.googleapis.com/v0/b/fotoad.appspot.com/o/FOTOAD_IMG%2Fuser-circle-solid.svg?alt=media&token=14bcfdda-70ce-4da2-b2f6-de3df84c3f69`;

  constructor(public fireAuth: AngularFireAuth,
              public uxService: UxService) {
                this.getCurrentUser()
              }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  register(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }

  googleLogin() {
    return this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  resetPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email)
  }

  logout() {
    return this.fireAuth.signOut()
  }

  getCurrentUser() {
    return this.fireAuth.currentUser
  }
}
