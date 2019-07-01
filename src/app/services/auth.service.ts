import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {

      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => {
        console.log(err);
        rejected(err)
      });
    });
  }

}
