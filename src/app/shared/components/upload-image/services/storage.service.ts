import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }
  
  imagenes: any[] = []

  async subirImagen(nombre: string, base64: any) {
    try {
      let respuesta = await this.storage.ref('user/').child(nombre).putString(base64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
