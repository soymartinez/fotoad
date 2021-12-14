import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public authService: AuthService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.getPerfil()
  }

  photoURLUser: string = ""

  getPerfil() {
    this.authService.getCurrentUser().then((user) => {
      this.dataService.getDoc('usuarios', user?.email)
        .subscribe((data: any)=> {
          this.photoURLUser = data.foto
        })
    })
  }

}
