import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {SubirImagen} from "../models/interface";
import {StorageService} from "../shared/components/upload-image/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private publicationsCollection: AngularFirestoreCollection<SubirImagen>;

  constructor(
    // Se crea un objeto de la clase angular firestore que se llama dataFirebase
    private dataFirebase: AngularFirestore,
    //Se crea un objeto de la clase de Storage Service
    private imagenes:StorageService){
    //Se inicializa el objeto publicaciones collection con el Path usuarios
    this.publicationsCollection = dataFirebase.collection<SubirImagen>('usuarios');
  }

  guardarPublicacion(publicacion: SubirImagen,usuario:string) {
    //Para guardar una publicacion se pasa el parametro del usuario y la publicacion se va a subir
    return this.publicationsCollection.doc(usuario).collection('publicaciones').add(publicacion)
  }
  mostrarPublicaciones(usuario:string) {
    //Le pasamos el usuario que desee obtener sus publicaciones
    return this.publicationsCollection.doc(usuario).collection('publicaciones').snapshotChanges()
  }
  actualizarPublicaciones(usuario:string,documentId: string, publicacion: any) {
    //Recibe como parametro el usuario el id del documento y la publicacion que se desea actualizar
    return this.publicationsCollection.doc(usuario).collection('publicaciones').doc(documentId).set(publicacion);
  }

  borrarPublicacion(usuario:string,documentId: string,imagenURL:string) {
    //Para borrar una publicacion se necesita el id del documento y el usuario y la url de la imagen para poder borrarla
    //del storage
    return this.publicationsCollection.doc(usuario).collection('publicaciones').doc(documentId).delete().then( value => {
        //Una vez cumplida la promesa se recurre al storage para borrar la imagen de la publicacion
      this.imagenes.borrarImagen(imagenURL)
      }
    );

  }
}
