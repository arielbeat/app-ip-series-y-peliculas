import { Component, OnInit } from '@angular/core';

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

  // Array para mostrar en HTML
  contenidos: any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    // Cargar datos desde Firebase
    this.crudService.getPelicula('accion').subscribe(peliculas => {
      peliculas.map(pelicula => {
        //console.log(pelicula.payload.doc.data());
        const data: contenido = pelicula.payload.doc.data() as contenido;
        data.id = pelicula.payload.doc.id;
        //console.log(data);
        this.contenidos.push(data);
      });
    });
  }

}
