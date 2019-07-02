import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

// Crear interface para objeto
interface contenido {
  categoria: string;
  titulo: string;
  genero: string;
  pais: string;
  sinopsis: string;
  img: string;
  clasificacion: number;
}

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
  img: string = '#';
  clasificacion: number;

  contenidos: any = [];

  ingreso: boolean;

  // Variables para funcionalidad
  uno: any = false;
  dos: any = false;
  tres: any = false;
  cuatro: any = false;
  cinco: any = false;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
  }

  verEstrellas5() {
    console.log('Ver estrellas 5');
    if (this.cinco) {
      this.cuatro = true;
      this.tres = true;
      this.dos = true;
      this.uno = true;
      this.clasificacion = 5;
    }
  }

  verEstrellas4() {
    console.log('Ver estrellas 4');
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
    console.log('Ver estrellas 3');
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
    console.log('Ver estrellas 2');
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
    console.log('Ver estrellas 1');
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
    console.log(this.tipo);
    console.log(this.categoria);
    console.log(this.clasificacion);
    //let datos: any = [];
    let datos: contenido = {
      'categoria': this.categoria,
      'titulo': this.titulo,
      'genero': this.genero,
      'pais': this.pais,
      'productora': this.productora,
      'sinopsis': this.sinopsis,
      'img': this.img,
      'clasificacion': this.clasificacion
    } as contenido;
    this.contenidos.push(datos);
    /*
    datos['categoria'] = this.categoria;
    datos['titulo'] = this.titulo;
    datos['genero'] = this.genero;
    datos['pais'] = this.pais;
    datos['productora'] = this.productora;
    datos['sinopsis'] = this.sinopsis;
    datos['imagen'] = this.imagen;
    datos['clasificacion'] = this.clasificacion;*/
    this.crudService.insertarContenido(this.tipo, this.contenidos);
    /*.then(resp => {
      console.log('Ingresado');
    }).catch(error => {
      console.log(error);
    });*/

  }

}
