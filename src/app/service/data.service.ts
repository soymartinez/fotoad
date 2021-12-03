// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   constructor(private dataFirebase: AngularFirestore) { }

//   crearId() {
//     return this.dataFirebase.createId();
//   }

//   crearColeccion(data: any, path: string, id: string) {
//     const ref = this.dataFirebase.collection(path);
//     return ref.doc(id).set(data);
//   }

//   borrarColeccion(data: any, path: string) {

//   }

//   getColeccion(path: string) {
//     const ref = this.dataFirebase.collection(path);
//     return ref.valueChanges()
//   }

//   editarColeccion() {

//   }

// }

// Modificacion de data.service, creado y guardado automatico directo desde firestore
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {SubirImagen} from "../models/interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private publicationsCollection: AngularFirestoreCollection<SubirImagen>;

  constructor(private dataFirebase: AngularFirestore) {
    this.publicationsCollection = dataFirebase.collection<SubirImagen>('categorias');
  }

  guardarPublicacion(publicacion: SubirImagen) {
    return this.publicationsCollection.add(publicacion)
  }
  mostrarPublicaciones() {
    return this.publicationsCollection.snapshotChanges()
  }
  actualizarPublicaciones(documentId: string, publicacion: any) {
    return this.publicationsCollection.doc(documentId).set(publicacion);
  }

  borrarPublicacion(documentId: string) {
    return this.publicationsCollection.doc(documentId).delete();
  }
}
