import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { CrudService } from '../../services/crud.service';

// Crear interface para array
interface serie {
  id: string;
  categoria: string;
  titulo: string;
  genero: string;
  pais: string;
  sinopsis: string;
  img: string;
  clasificacion: number;
}

@Component({
  selector: 'app-comedia',
  templateUrl: './comedia.page.html',
  styleUrls: ['./comedia.page.scss'],
})
export class ComediaPage implements OnInit {

  // Array para mostrar en HTML
  series: any = [];

  // Variable para estrellas
  clasificacion: any;

  // Variables para funcionalidad
  ngMTipo: boolean;
  mostrarTg: boolean;
  uno: any = false;
  dos: any = false;
  tres: any = false;
  cuatro: any = false;
  cinco: any = false;

  constructor(
    public navController: NavController,
    public actionSheetController: ActionSheetController,
    private crudService: CrudService
  ) { }

  ngOnInit() {

    // Cargar datos desde Firebase
    this.crudService.getSeries('comedia').subscribe(series => {
      series.map(series => {
        //console.log(pelicula.payload.doc.data());
        const data: serie = series.payload.doc.data() as serie;
        data.id = series.payload.doc.id;
        //console.log(data);
        this.series.push(data);
        // Elegir clasificación
    
        switch (data.clasificacion) {
          case 5:
            this.cinco = true;
            this.verEstrellas5();
            break;
          case 4:
            this.cuatro = true;
            this.verEstrellas4();
            break;
          case 3:
            this.tres = true;
            this.verEstrellas3();
            break;
          case 2:
            this.dos = true;
            this.verEstrellas2();
            break;
          case 1:
            this.uno = true;
            this.verEstrellas1();
            break;
          default:
            this.uno = false;
            this.verEstrellas1();
            break;
        }
      });
    });

  }

  volver() {
    this.navController.back();
  }

  verTg() {
    if(!this.ngMTipo) {
      this.mostrarTg = true;
    } else {
      this.mostrarTg = false;
    }
  }

  async compartir() {
    const share = await this.actionSheetController.create({
      header: 'Opciones',
      buttons:
      [
        {
          text: 'Facebook',
          icon: 'logo-facebook'
        },
        {
          text: 'Pinterest',
          icon: 'logo-pinterest'
        },
        {
          text: 'Tumblr',
          icon: 'logo-tumblr'
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter'
        }
      ]
    });
    share.present();
  }

  verEstrellas5() {
    console.log('Ver estrellas 5');
    if (this.cinco) {
      this.cuatro = true;
      this.tres = true;
      this.dos = true;
      this.uno = true;
    }
  }

  verEstrellas4() {
    console.log('Ver estrellas 4');
    if (this.cuatro) {
      this.tres = true;
      this.dos = true;
      this.uno = true;
    } else {
      this.cinco = false;
    }
  }

  verEstrellas3() {
    console.log('Ver estrellas 3');
    if (this.tres) {
      this.dos = true;
      this.uno = true;
    } else {
      this.cinco = false;
      this.cuatro = false;
    }
  }

  verEstrellas2() {
    console.log('Ver estrellas 2');
    if (this.dos) {
      this.uno = true;
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
    }
  }

}