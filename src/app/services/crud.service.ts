import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
//import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private angularFirestore: AngularFirestore
    //private angularFireDatabase: AngularFireDatabase,
    //private angularFirestoreCollection: AngularFirestoreCollection
  ) { }

  getPeliculas() {
    return this.angularFirestore.collection('peliculas').snapshotChanges();
  }

  getPelicula(categoria: string) {
    return this.angularFirestore.collection('peliculas', ref => ref.where('categoria', '==', categoria)).snapshotChanges();
  }

  insertarContenido(tipo: any, datos: any) {
    return this.angularFirestore.collection(tipo).add(datos);
    //const pushId = this.angularFirestore.add();
    //console.log(pushId);
    //return true;
  }

}
