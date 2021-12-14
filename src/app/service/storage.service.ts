import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Imagenes } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  imagenes: Imagenes[] = []

  async subirImagen(path: string, nombreImagen: string, base64: any) {
    try {
      let respuesta = await this.storage.ref(path).child(nombreImagen).putString(base64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (error) {
      return;
    }
  }

  borrarImagen(url:string){
    this.storage.refFromURL(url).delete()
  }
}
