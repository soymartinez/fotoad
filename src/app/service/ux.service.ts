import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UxService {

  constructor(public toastController: ToastController,
              public loadingController: LoadingController) { }

  public loading: any;

  async Toast(mensaje: string, duracion: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion,
      position: 'top'
    });
    toast.present();
  }

  async Toasterror(mensaje: string, duracion: number) {
    const toast = await this.toastController.create({
      color: 'danger',
      message: mensaje,
      duration: duracion,
      position: 'top'
    });
    toast.present();
  }

  async Loading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    await this.loading.present();
  }

  async finishLoading() {
    this.loading.dismiss();
  }
}
