import { Component, OnInit } from '@angular/core';

import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
  }

  imagenes: any[] = []
  nombreUsuario = 'Martinez'

  cargarImagen(event: any) {
    let archivos = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(archivos[0])
    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
      this.storage.subirImagen(`${this.nombreUsuario}/${new Date().getTime()}`, reader.result)
        .then( urlImagen => {
          let usuario = {
            name: this.nombreUsuario,
            imgUser: urlImagen
          }
          console.log(usuario);
      });
    }
  }
}

// this.router.navigateByUrl('/');