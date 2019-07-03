import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { AlertController, ToastController } from '@ionic/angular';

// Crear interface para objeto
interface contenido {
  id: string;
  titulo: string;
}

interface contenidoTitulo {
  id: string;
  titulo: string;
  genero: string;
  pais: string;
  productora: string;
  sinopsis: string;
  img: string;
}

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  tipo: string;
  categoria: string;
  id: string;
  titulo: string;
  genero: string;
  pais: string;
  productora: string;
  sinopsis: string;
  img: string;

  // Array para mostrar en HTML
  titulos: any = [];
  contenidos: any = [];

  modificado: boolean = false;

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
        const data: contenido = titulo.payload.doc.data() as contenido;
        data.id = titulo.payload.doc.id;
        this.titulos.push(data);
      });
    });
  }

  cargarDatosTitulo() {
    console.log(this.titulos);
    console.log(this.id);
    this.crudService.getTitulo(this.tipo, this.id).then(datos => {
      console.log(datos);
      console.log(datos.data());
      const data: contenidoTitulo = datos.data() as contenidoTitulo;
      this.contenidos.push(data);
      /*
      datos.map(contenido => {
        const data: contenidoTitulo = datos.payload.doc.data() as contenidoTitulo;
        data.id = datos.payload.doc.id;
        console.log(data.id);
        this.contenidos.push(data);
      //});*/
    });
  }

  guardar() {
    if (this.titulo !== undefined) {
      this.confirmar();
    } else {
      // lanzar toast
      this.mensaje();
    }
  }

  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Se guardará el título seleccionado',
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
            //this.modificarTitulo();
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
  /*
  modificarTitulo() {
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
*/
}
