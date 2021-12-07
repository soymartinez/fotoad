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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  email = ''

  async resetPassword() {
    await this.authService.resetPassword(this.email);
  }
}
