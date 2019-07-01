import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
//import { LeerService, Idea } from '../../services/leer.service';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.page.html',
  styleUrls: ['./accion.page.scss'],
})
export class AccionPage implements OnInit {

  //private ideas: Observable<Idea[]>;

  // Variables para HTML
  titulo: any;
  pais: any;
  productora: any;
  genero: any;
  sinopsis: any;
  imagen: any = 'https://firebasestorage.googleapis.com/v0/b/ip-series-y-peliculas.appspot.com/o/Dragon-Ball-Super-Broly-2.jpg?alt=media&token=fed4eae8-1f7e-4f81-84bb-7e8e3c180de8';
  clasificacion: any;

  ngMTipo: boolean;
  mostrarTg: boolean;
  uno: any = false;
  dos: any = false;
  tres: any = false;
  cuatro: any = false;
  cinco: any = false;

  constructor(
    public navController: NavController,
    public actionSheetController: ActionSheetController
    /*,
    private leerService: LeerService*/
  ) { }

  ngOnInit() {
    //this.ideas = this.leerService.getIdeas();

    //console.log(this.ideas);
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