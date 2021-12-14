import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SubirImagen } from 'src/app/models/interface';
import { DataService } from 'src/app/service/data.service';
import { UxService } from 'src/app/service/ux.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {

  nombreUsuario
  archivo: any
  imagenUrl: any
  cancelar = false

  // Datos del usuario actual
  nameUser: string = ''
  emailUser: string = ''

  albumes: string[] = ['Deporte', 'Familia', 'Amigos', 'Otros'];
  nuevaFoto: SubirImagen = {
    url: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    visibilidad: ''
  }

  constructor(private authService: AuthService,
              private router : Router,
              private storage: StorageService,
              private uxService: UxService,
              private dataService: DataService) {
              this.nombreUsuario = localStorage.getItem('usuario')
  }

  ngOnInit(): void {
  }

  async cargarImagen(event: any) {
    this.cancelar = false
    this.archivo = event.target.files;
    if (this.archivo) {
      this.nuevaFoto.nombre = this.archivo[0].name;
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagenUrl = event.target.result;
      }
      reader.readAsDataURL(this.archivo[0]);
    } else {
      this.uxService.Toasterror('Selecciona una imagen 😑', 2000);
    }
  }

  publicar(descripcion: string, categoria: string, visibilidad: string) {
    if (this.cancelar) {
      this.uxService.Toasterror('Selecciona una imagen 😑', 2000);
    } else {
      try {
        this.authService.getCurrentUser().then((user) => {
          this.emailUser = user?.email!
          this.nameUser = user?.displayName!
        })

        let reader = new FileReader();
        this.nuevaFoto.nombre = this.archivo[0].name;

        reader.readAsDataURL(this.archivo[0])
        reader.onloadend = async () => {
          this.uxService.Loading('Publicando');
          await this.storage.subirImagen(`usuarios/${this.emailUser}/posts`, `${this.nuevaFoto.nombre}${new Date().getTime()}`, reader.result)
            .then((urlStorage: any) => {
              const data = 
                {
                  nombre: this.archivo[0].name,
                  url: urlStorage!,
                  categoria: categoria,
                  descripcion: descripcion,
                  visibilidad: visibilidad
                }
              
              // crea el documento en la base de datos | usuarios
              this.dataService.savePost(data, visibilidad, this.emailUser, categoria)
              // crea el documento en la base de datos | categorias              
              visibilidad === 'publico'
              ? this.dataService.crearPost('categorias', categoria, data)
              : ''
            })
        }
        this.router.navigate(['/'])
        this.uxService.finishLoading();
        this.uxService.Toast('Se a subido correctamente! 😄', 2000);
      } catch (error) {
        this.uxService.Toasterror('Algo salio mal 😯', 2000);
      } finally {
        this.imagenUrl = undefined
        this.nuevaFoto = {
          url: '',
          nombre: '',
          descripcion: '',
          categoria: '',
          visibilidad: ''
        }
      }
    }
  }
              // this.nuevaFoto.url = urlImagen || undefined;
              // this.nuevaFoto.descripcion = descripcion
              // this.nuevaFoto.album = album
              // this.nuevaFoto.visibilidad = visibilidad
              // this.data_base.guardarPublicacion(this.nuevaFoto)
              // this.archivo = undefined


cambairImagen() {
  this.imagenUrl = undefined
  this.nuevaFoto.nombre = ''
  this.nuevaFoto.descripcion = ''

  this.cancelar = true
}

borrar(idDocument: string, urlImagen: string) {
  this.uxService.Loading('Borrando 👀');
  this.dataService.borrarPublicacion(idDocument, urlImagen)
    .then(() => {
      this.uxService.finishLoading()
      this.uxService.Toast('Se borro correctamente', 2000)
    }).catch(() => {
      this.uxService.finishLoading()
      this.uxService.Toasterror('No se pudo borrar', 2000)
    })
}
}
