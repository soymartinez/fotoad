import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/services/auth.service';
import { Imagenes, SubirImagen } from '../models/interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private publicationsCollection: AngularFirestoreCollection<SubirImagen>;

  constructor(private dataFirebase: AngularFirestore, 
              private imagenes: StorageService) {
              this.publicationsCollection = this.dataFirebase.collection<SubirImagen>('categorias');
  }
  
  // Crear nuevas colecciones
  crearDoc(data: any, path: string, id: string) { 
    const collection = this.dataFirebase.collection(path);
    return collection.doc(id).set(data);
  }

  // Puede leer cualquier documento de la base de datos
  getDoc(path: string, email: any) {
    const collection = this.dataFirebase.collection(path);
    return collection.doc(email).valueChanges()
  }

  // puede actualizar cualquier documento de la base de datos
  updateDoc(path: string, email: any, data: any) {
    return this.dataFirebase.collection(path).doc(email).update(data)
  }
  
  // puede eliminar cualquier documento la base de datos
  eliminarDoc(path: string, email: any) {
    return this.dataFirebase.collection(path).doc(email).delete()
  }

  // id firestore
  getId() {
    return this.dataFirebase.createId()
  }

  // guarda los post en la base de datos | categorias
  crearPost(path: string, categoria: string, data: any) {
    const db = this.dataFirebase
    const categorias = db.collection(path).doc('fotoad-publico').collection(categoria).add(data)
    return categorias
  }

  // guarda los post en la base de datos | usuarios
  savePost(data: any, visibilidad: string, email: string, categorias: string) { 
    const db = this.dataFirebase
    const usuario = db.collection('usuarios').doc(email);
    const album = usuario.collection('albumes').doc(visibilidad)
    const categoria = album.collection(categorias).add(data)
    return categoria
  }

  // Puede leer cualquier documento de la base de datos
  getCategoriasDeportes() {
    const collection = this.dataFirebase.collection('categorias')
    const categorias = collection.doc('fotoad-publico').collection('Deporte').valueChanges()
    return categorias
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

  borrarPublicacion(documentId: string, imagenURL: string) {
    return this.publicationsCollection.doc(documentId).delete().then(() => {
      this.imagenes.borrarImagen(imagenURL)
    });
  }
}
