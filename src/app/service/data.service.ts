import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private dataFirebase: AngularFirestore) { }

  crearId() {
    return this.dataFirebase.createId();
  }

  crearColeccion(data: any, path: string, id: string) {
    const ref = this.dataFirebase.collection(path);
    return ref.doc(id).set(data);
  }

  borrarColeccion(data: any, path: string) {

  }

  getColeccion(path: string) {
    const ref = this.dataFirebase.collection(path);
    return ref.valueChanges()
  }

  editarColeccion() {

  }

}
