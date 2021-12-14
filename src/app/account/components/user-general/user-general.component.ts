import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user-general',
  templateUrl: './user-general.component.html',
  styleUrls: ['./user-general.component.css']
})
export class UserGeneralComponent implements OnInit {

  constructor(private dataService: DataService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser()
  }

  nombreUser: string = ""
  emailUser: string = ""
  photoURLUser: string = ""

  getUser() {
    this.authService.getCurrentUser().then((user) => {
      const email = user?.email
      this.dataService.getDoc('usuarios', email)
        .subscribe((data: any) => {
          this.nombreUser = data.nombre
          this.emailUser = data.email
          this.photoURLUser = data.foto
        })
    })
    //   this.nombreUser = user?.displayName!
    //   this.emailUser = user?.email!
    //   this.photoURLUser = user?.photoURL!
  // })
  }

}
