import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/service/data.service';
import { UxService } from 'src/app/service/ux.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  nombreUser: string = '';
  emailUser: string = '';
  photoURLUser: string = '';

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private uxService: UxService,
              private router: Router,
              private dataService: DataService) {
              this.getPerfil()
  }

  ngOnInit(): void {
  }

  cancelar = false
  nuevoEmail: any = this.emailUser
  nuevaImagen: any = this.photoURLUser // imagen a cambiar (DINAMICO)

  async getPerfil() {
    await this.authService.getCurrentUser().then((user) => {
      this.emailUser = user?.email!
      this.dataService.getDoc('usuarios', user?.email)
        .subscribe((data: any) => {
          this.nombreUser = data.nombre
          this.emailUser = data.email
          this.photoURLUser = data.foto
          this.nuevaImagen = data.foto
        })
    })
  }

  deshacerCambio() {
    this.cancelar = true
    this.nuevaImagen = this.photoURLUser
  }

  cargarImagen(event: any) {
    this.cancelar = false
    const archivo = event.target.files;
    if (archivo) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.nuevaImagen = event.target.result;
      }
      reader.readAsDataURL(archivo[0]);
    } else {
      this.uxService.Toasterror('Selecciona una imagen 😑', 1000);
    }
  }

  async updateProfile() {
    if (this.nuevaImagen !== this.photoURLUser || this.emailUser !== this.nuevoEmail) {
      this.uxService.Loading('Actualizando perfil')
      const urlImagen = await this.storageService.subirImagen(`usuarios/${this.emailUser}`, 'perfil', this.nuevaImagen)
      this.authService.fireAuth.user
        .subscribe(user => {
          user?.updateProfile({
            displayName: this.nombreUser,
            photoURL: urlImagen
          }).then(async () => {
            this.nuevoEmail = user.email
            const data = {
              nombre: this.nombreUser,
              foto: user.photoURL
            }
            await this.dataService.updateDoc('usuarios', this.emailUser, data)
          })
        })
      this.router.navigateByUrl('/account/overview')
      this.uxService.Toast('Se a actualizado correctamente 😊', 1000);
      this.uxService.finishLoading()
    } else {
      this.uxService.Toasterror('No ha habido modificaciones 😑', 1000);
    }
  }
}
