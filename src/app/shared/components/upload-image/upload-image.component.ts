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
  archivo:any
  url:any

  albumes: string[] = ['Deporte', 'Familia', 'Escuela', 'Amigos'];
  nuevaFoto: SubirImagen = {
    url: '',
    nombre: '',
    descripcion: '',
    album: '',
    visibilidad: ''
  }

  constructor(private storage: StorageService,
              public uxService: UxService,
              private data_base: DataService) {
  }

  ngOnInit(): void {
  }


  // La previsualizacion de la imagen antes de subirla
  async cargarImagen(event: any) {
    this.archivo = event.target.files;
    this.nuevaFoto.nombre = this.archivo[0].name;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  publicar(descripcion: string,album: string,visibilidad: string){
    this.uxService.Loading('Subiendo');
    let reader = new FileReader();
    this.nuevaFoto.nombre = this.archivo[0].name;

    reader.readAsDataURL(this.archivo[0])
    reader.onloadend = async () => {
      await this.storage.subirImagen(`${sessionStorage.getItem('usuario')}/${new Date().getTime()}`, reader.result)
        .then( urlImagen => {
          // Se definen los campos de las publicaciones del usuario
          this.nuevaFoto.url = urlImagen || undefined;
          this.nuevaFoto.descripcion = descripcion
          this.nuevaFoto.album = album
          this.nuevaFoto.visibilidad = visibilidad
          this.data_base.guardarPublicacion(this.nuevaFoto,<string> sessionStorage.getItem('usuario'))
          this.url =  undefined
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

  borrar(idDocument:string,urlImagen:string){
    this.data_base.borrarPublicacion(<string> sessionStorage.getItem('usuario'),idDocument,urlImagen).then(value => {
      console.log('se borro correctamente')
    })
  }

}

// this.router.navigateByUrl('/');
