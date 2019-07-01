import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  categoria: any;

  constructor(
    public navController: NavController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
  }

  verCategoria() {
    switch (this.categoria) {
      case 'accion': {
        this.navController.navigateForward('/series/accion');
        break;
      }
      case 'ciencia': {
        this.navController.navigateForward('/series/ciencia');
        break;
      }
      case 'comedia': {
        this.navController.navigateForward('/series/comedia');
        break;
      }
      case 'terror': {
        this.navController.navigateForward('/series/terror');
        break;
      }
      default: {
        this.mensaje();
        break;
      }
    }
  }

  async mensaje() {
    const toast = await this.toastController.create({
      message: 'Seleccione una categoria',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

}
