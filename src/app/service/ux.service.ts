import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UxService {

  constructor(public toastController: ToastController,
              public loadingController: LoadingController) { }

  loading = false;

  async Loading(mensaje: string) {

    return await this.loadingController.create({
      message: mensaje
    }).then(a => {
      a.present().then(() => {
        if (!this.loading) {
          a.dismiss()
        }
      });
    });
  }

  async finishLoading() {
    this.loading = false;
    await this.loadingController.dismiss();
  }

  async Toast(mensaje: string, duracion: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion,
      position: 'top',
      cssClass:"toast-success",
    });
    toast.present();
  }

  async Toasterror(mensaje: string, duracion: number) {
    const toast = await this.toastController.create({
      cssClass:"toast-terror",
      message: mensaje,
      duration: duracion,
      position: 'top'
    });
    toast.present();
  }

}
