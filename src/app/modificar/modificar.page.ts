import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { AlertController, ToastController } from '@ionic/angular';

// Crear interface para objeto
interface titulo {
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

  // Mostrar contenido
  mostrarTitulos: boolean = false;
  mostrarContenido: boolean = false;

  // Variable para confirmar ingreso
  validador: boolean = false;
  modificar: boolean = false;
  guardado: boolean = false;

  constructor(
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  verTipo(){
    if (this.categoria !== undefined) {
      this.cargarTitulos();
    }
  };

  verCategoria() {
    if (this.tipo !== undefined) {
      this.cargarTitulos();
    }
  }

  cargarTitulos() {
    this.mostrarContenido = false;
    // Cargar datos desde Firebase
    this.titulos = [];
    this.crudService.getTitulos(this.tipo, this.categoria).subscribe(titulos => {
      titulos.map(titulo => {
        const data: titulo = titulo.payload.doc.data() as titulo;
        data.id = titulo.payload.doc.id;
        this.titulos.push(data);
        this.mostrarTitulos = true;
      });
    });
  }

  cargarDatosTitulo() {
    this.crudService.getTitulo(this.tipo, this.id).then(datos => {
      const data: contenidoTitulo = datos.data() as contenidoTitulo;
      this.titulo = data.titulo;
      this.genero = data.genero;
      this.pais = data.pais;
      this.productora = data.productora;
      this.sinopsis = data.sinopsis;
      this.img = data.img;
      this.mostrarContenido = true;
    });
  }

  guardar() {
    if (this.tipo === undefined || this.categoria === undefined) {
      // lanzar toast
      this.mensajeTipoCategoria();
    } else if (this.id === undefined) {
      this.mensajeTitulo();
    } else {
      this.validador = this.validar();
      if (this.validador) {
        this.confirmar();
      } else {
        this.vacios();
      }
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
            // Función modificar Título
            this.modificarTitulo();
          }
        }
      ]
    });
    alert.present();
  }

  async mensajeTipoCategoria() {
    const toast = await this.toastController.create({
      message: '¡Debe seleccionar Tipo y Categoría!',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  async mensajeTitulo() {
    const toast = await this.toastController.create({
      message: '¡Debe seleccionar un Título!',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  modificarTitulo() {
    let datos: Object = {};
    this.guardado = false;
    this.validador = this.validar();
    if  (this.validador) {
      datos  = {
        'titulo': this.titulo,
        'genero': this.genero,
        'pais': this.pais,
        'productora': this.productora,
        'sinopsis': this.sinopsis,
        'img': this.img
      };
      this.crudService.modificarTitulo(this.tipo, this.id, datos).then(() => {
        this.guardado = true;
      }).catch(error => {
        console.log(error);
        this.guardado = false;
      }).finally(() => {
        if (this.guardado) {
          this.mensajeGuardado();
          this.cargarTitulos();
        }
      });
    } else {
      this.vacios();
    }
  }

  async mensajeGuardado() {
    const toast = await this.toastController.create({
      message: '¡Guardado exitosamente!',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  // Validar vacios
  validar() {
    if (this.titulo === undefined || this.titulo === '') {
      return false;
    }
    if (this.genero === undefined || this.genero === '') {
      return false;
    }
    if (this.pais === undefined || this.pais === '') {
      return false;
    }
    if (this.productora === undefined || this.productora === '') {
      return false;
    }
    if (this.sinopsis === undefined || this.sinopsis === '') {
      return false;
    }
    if (this.img === undefined || this.img === '') {
      return false;
    }
    return true;
  }

  // Alert para vacíos
  async vacios() {
    const alert = await this.alertController.create({
      header: 'Error al guardar datos',
      message: '¡Ingrese los datos correctamente!',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
