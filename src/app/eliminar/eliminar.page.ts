import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { AlertController, ToastController } from '@ionic/angular';

// Crear interface para objeto
interface contenido {
  id: string;
  titulo: string;
}

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  tipo: string;
  categoria: string;
  id: string;
  titulo: string;

  // Array para mostrar en HTML
  titulos: any = [];

  borrado: boolean = false;

  constructor(
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  verTipo(){
    console.log(this.tipo);
    if (this.categoria !== undefined) {
      this.cargarTitulos();
    }
  };

  verCategoria() {
    console.log(this.categoria);
    if (this.tipo !== undefined) {
      this.cargarTitulos();
    }
  }

  cargarTitulos() {
    // Cargar datos desde Firebase
    this.titulos = [];
    this.crudService.getTitulos(this.tipo, this.categoria).subscribe(titulos => {
      titulos.map(titulo => {
        //console.log(pelicula.payload.doc.data());
        const data: contenido = titulo.payload.doc.data() as contenido;
        data.id = titulo.payload.doc.id;
        //console.log(data);
        this.titulos.push(data);
      });
    });
  }

  eliminar() {
    if (this.id !== undefined) {
      this.confirmar();
    } else {
      // lanzar toast
      this.mensaje();
    }
  }

  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Se eliminará el título seleccionado',
      message: '¿Está seguro?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (dato) => {
            // Cancelado
            console.log('cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: (dato) => {
            // Confirmado
            console.log('confirmado');
            // Función eliminar confirmado
            this.eliminarTitulo();
          }
        }
      ]
    });
    alert.present();
  }

  async mensaje() {
    const toast = await this.toastController.create({
      message: '¡Debe elegir un título!',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  eliminarTitulo() {
    this.crudService.eliminarTitulo(this.tipo, this.id).then(respuesta => {
      console.log(respuesta);
      console.log(this.id);
      this.borrado = true;
      if (this.borrado) {
        this.cargarTitulos();
        this.eliminado();
      }
    }).catch(error => {
      console.log(error);
      this.borrado = false;
    });
  }

  async eliminado() {
    const toast = await this.toastController.create({
      message: '¡Eliminado exitosamente!',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

}
