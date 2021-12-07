import { Component, OnInit } from '@angular/core';

import { StorageService } from './services/storage.service';
import { SubirImagen } from '../../../models/interface';
import { UxService } from 'src/app/service/ux.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private storage: StorageService,
              public uxService: UxService) { }

  ngOnInit(): void {
  }

  imagenes: any[] = []
  nombreUsuario = 'Martinez'

  albumes: string[] = ['Deporte', 'Familia', 'Escuela', 'Amigos'];
  nuevaFoto: SubirImagen = {
    url: '',
    nombre: '',
    descripcion: '',
    album: '',
    visibilidad: ''
  }
  
  
  async cargarImagen(event: any) {
    this.uxService.Loading('Subiendo');
    let archivos = event.target.files;
    let reader = new FileReader();
    this.nuevaFoto.nombre = event.target.files[0].name;
    
    reader.readAsDataURL(archivos[0])
    reader.onloadend = async () => {
      await this.storage.subirImagen(`${this.nombreUsuario}/${new Date().getTime()}`, reader.result)
        .then( urlImagen => {
          this.imagenes.push(event.target.files[0]);
          this.nuevaFoto.url = urlImagen || undefined;
          console.log(this.nuevaFoto);
        });
        this.uxService.finishLoading();
        this.nuevaFoto = {
          url: '',
          nombre: '',
          descripcion: '',
          album: '',
          visibilidad: ''
        }
        this.uxService.Toast('Se a subido correctamente!', 2000);
    }
  }
}

// this.router.navigateByUrl('/');