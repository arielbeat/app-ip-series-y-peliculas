import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private angularFirestore: AngularFirestore) { }

  getPeliculas() {
    return this.angularFirestore.collection('peliculas').snapshotChanges();
  }

  getPelicula(categoria: string) {
    return this.angularFirestore.collection('peliculas', ref => ref.where('categoria', '==', categoria)).snapshotChanges();
  }

}
