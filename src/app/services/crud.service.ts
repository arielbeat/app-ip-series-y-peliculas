import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  getPeliculas() {
    return this.angularFirestore.collection('peliculas').snapshotChanges();
  }

  getPelicula(categoria: string) {
    return this.angularFirestore.collection('peliculas', ref => ref.where('categoria', '==', categoria)).snapshotChanges();
  }

  getSeries(categoria: string) {
    return this.angularFirestore.collection('series', ref => ref.where('categoria', '==', categoria)).snapshotChanges();
  }

  insertarContenido(tipo: string, datos: Object) {
    return this.angularFirestore.collection(tipo).add(datos);
  }

  getTitulos(tipo: string, categoria: string) {
    return this.angularFirestore.collection(tipo, ref => ref.where('categoria', '==', categoria)).snapshotChanges();
    /*
    if (tipo === 'peliculas') {
      return this.angularFirestore.collection('peliculas', ref => ref.where('categoria', '==', categoria)).snapshotChanges();
    } else if (tipo === 'series') {
      return this.angularFirestore.collection('series', ref => ref.where('categoria', '==', categoria)).snapshotChanges();
    }
    */
  }

  eliminarTitulo(tipo: string, id: string) {
    console.log(id);
    return this.angularFirestore.collection(tipo).doc(id).delete();
  }

  getTitulo(tipo: string, id: string) {
    return this.angularFirestore.collection(tipo).doc(id).ref.get();
    /*
    if (tipo === 'peliculas') {
      return this.angularFirestore.collection('peliculas').doc(id).ref.get();
    } else if (tipo === 'series') {
      return this.angularFirestore.collection('series').doc(id).ref.get();
    }*/
  }

  modificarTitulo(tipo: string, id: string, datos: Object) {
      return this.angularFirestore.collection(tipo).doc(id).update(datos);
  }

}
