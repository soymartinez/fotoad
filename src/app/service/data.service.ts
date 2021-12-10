import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SubirImagen } from '../models/interface';
import { StorageService } from '../shared/components/upload-image/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private publicationsCollection: AngularFirestoreCollection<SubirImagen>;

  constructor(private dataFirebase: AngularFirestore, 
              private imagenes: StorageService) {
              this.publicationsCollection = this.dataFirebase.collection<SubirImagen>('categorias');
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
