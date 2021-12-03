// import { Component, OnInit } from '@angular/core';

// import { StorageService } from './services/storage.service';
// import { SubirImagen } from '../../../models/interface';
// import { UxService } from 'src/app/service/ux.service';

// @Component({
//   selector: 'app-upload-image',
//   templateUrl: './upload-image.component.html',
//   styleUrls: ['./upload-image.component.css']
// })
// export class UploadImageComponent implements OnInit {

//   constructor(private storage: StorageService,
//               public uxService: UxService) { }

//   ngOnInit(): void {
//   }

//   imagenes: any[] = []
//   nombreUsuario = 'Martinez'

//   albumes: string[] = ['Deporte', 'Familia', 'Escuela', 'Amigos'];
//   nuevaFoto: SubirImagen = {
//     url: '',
//     nombre: '',
//     descripcion: '',
//     album: '',
//     visibilidad: ''
//   }
  
  
//   async cargarImagen(event: any) {
//     this.uxService.Loading('Subiendo');
//     let archivos = event.target.files;
//     let reader = new FileReader();
//     this.nuevaFoto.nombre = event.target.files[0].name;
    
//     reader.readAsDataURL(archivos[0])
//     reader.onloadend = async () => {
//       await this.storage.subirImagen(`${this.nombreUsuario}/${new Date().getTime()}`, reader.result)
//         .then( urlImagen => {
//           this.imagenes.push(event.target.files[0]);
//           this.nuevaFoto.url = urlImagen || undefined;
//           console.log(this.nuevaFoto);
//         });
//         this.uxService.finishLoading();
//         this.nuevaFoto = {
//           url: '',
//           nombre: '',
//           descripcion: '',
//           album: '',
//           visibilidad: ''
//         }
//         this.uxService.Toast('Se a subido correctamente!', 2000);
//     }
//   }
// }

// this.router.navigateByUrl('/');

//Modificacion de upload-image.component.ts
import { Component, OnInit } from '@angular/core';

import { StorageService } from './services/storage.service';
import { SubirImagen } from '../../../models/interface';
import { UxService } from 'src/app/service/ux.service';
import {DataService} from "../../../service/data.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private storage: StorageService,
              public uxService: UxService,
              private data_base: DataService) { }

  ngOnInit(): void {
  }

  imagenes: any[] = []
  nombreUsuario = 'Martinez'
  archivo:any

  albumes: string[] = ['Deporte', 'Familia', 'Escuela', 'Amigos'];
  nuevaFoto: SubirImagen = {
    url: '',
    nombre: '',
    descripcion: '',
    album: '',
    visibilidad: ''
  }


  async cargarImagen(event: any) {
    this.archivo = event.target.files;
    this.nuevaFoto.nombre = this.archivo[0].name;
  }
  publicar(descripcion: string,album: string,visibilidad: string){
    this.uxService.Loading('Subiendo');
    let reader = new FileReader();
    this.nuevaFoto.nombre = this.archivo[0].name;

    reader.readAsDataURL(this.archivo[0])
    reader.onloadend = async () => {
      await this.storage.subirImagen(`${this.nombreUsuario}/${new Date().getTime()}`, reader.result)
        .then( urlImagen => {
          this.imagenes.push(this.archivo);
          this.nuevaFoto.url = urlImagen || undefined;
          this.nuevaFoto.descripcion = descripcion
          this.nuevaFoto.album = album
          this.nuevaFoto.visibilidad = visibilidad
          console.log(this.nuevaFoto);
          this.data_base.guardarPublicacion(this.nuevaFoto)
          this.archivo= undefined
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