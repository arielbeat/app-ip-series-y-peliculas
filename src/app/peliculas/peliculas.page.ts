import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class PeliculasPage implements OnInit {

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
        this.navController.navigateForward('/peliculas/accion');
        break;
      }
      case 'ciencia': {
        this.navController.navigateForward('/peliculas/ciencia');
        break;
      }
      case 'comedia': {
        this.navController.navigateForward('/peliculas/comedia');
        break;
      }
      case 'terror': {
        this.navController.navigateForward('/peliculas/terror');
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
