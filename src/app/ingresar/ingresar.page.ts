import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  tipo: string;
  categoria: string;
  titulo: string;
  genero: string;
  pais: string;
  productora: string;
  sinopsis: string;
  img: string;
  clasificacion: number;

  // Variables para funcionalidad
  uno: any = false;
  dos: any = false;
  tres: any = false;
  cuatro: any = false;
  cinco: any = false;

  // Variable para confirmar ingreso
  validador: boolean = false;
  ingreso: boolean = false;

  constructor(
    private crudService: CrudService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  verEstrellas5() {
    if (this.cinco) {
      this.cuatro = true;
      this.tres = true;
      this.dos = true;
      this.uno = true;
      this.clasificacion = 5;
    }
  }

  verEstrellas4() {
    if (this.cuatro) {
      this.tres = true;
      this.dos = true;
      this.uno = true;
      this.clasificacion = 4;
    } else {
      this.cinco = false;
    }
  }

  verEstrellas3() {
    if (this.tres) {
      this.dos = true;
      this.uno = true;
      this.clasificacion = 3;
    } else {
      this.cinco = false;
      this.cuatro = false;
    }
  }

  verEstrellas2() {
    if (this.dos) {
      this.uno = true;
      this.clasificacion = 2;
    } else {
      this.cinco = false;
      this.cuatro = false;
      this.tres = false;
    }
  }

  verEstrellas1() {
    if (!this.uno) {
      this.cinco = false;
      this.cuatro = false;
      this.tres = false;
      this.dos = false;
    } else {
      this.clasificacion = 1;
    }
  }

  // Función ingresar
  ingresar() {
    this.validador = this.validar();
    console.log(this.validador);
    let datos: Object = {
      'categoria': this.categoria,
      'titulo': this.titulo,
      'genero': this.genero,
      'pais': this.pais,
      'productora': this.productora,
      'sinopsis': this.sinopsis,
      'img': this.img,
      'clasificacion': this.clasificacion
    };
    if (this.validador) {
      console.log(datos);
      this.crudService.insertarContenido(this.tipo, datos).then(respuesta => {
        console.log(respuesta); 
        console.log(datos);
        this.ingreso = true;
        if (this.ingreso) {
          this.ingresado();
          this.tipo = '';
          this.categoria = '';
          this.titulo = '';
          this.genero = '';
          this.pais = '';
          this.productora = '';
          this.sinopsis = '';
          this.img = '';
          this.clasificacion = 0;
        }
      }).catch(error => {
        console.log(error);
        this.ingreso = false;
      });
    } else {
      // Alert
      this.vacios();
    }
    datos = {};
  }

  // Validar vacios
  validar() {
    if (this.tipo === undefined || this.tipo === '') {
      return false;
    }
    if (this.categoria === undefined || this.categoria === '') {
      return false;
    }
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
    if (this.clasificacion === undefined || this.clasificacion === 0) {
      return false;
    }
    return true;
  }

  // Alert para vacíos
  async vacios() {
    const alert = await this.alertController.create({
      header: 'Error al ingresar datos',
      message: '¡Ingrese los datos correctamente!',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  async ingresado() {
    const alert = await this.alertController.create({
      header: 'Ingreso exitoso',
      message: '¡Ingresado correctamente!',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
