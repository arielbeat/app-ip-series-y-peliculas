import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any = '';
  password: any = '';

  constructor(
    private authService: AuthService,
    public toastController: ToastController,
    public navController: NavController
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.email);
    console.log(this.password);
    if (this.email === undefined || this.email === '' || this.password === undefined || this.password === '') {
      this.toast();
    } else {
      this.authService.login(this.email, this.password).then(res => {
        // Redirección
        this.navController.navigateForward('/home');
      }).catch(err => this.toast());
    }
  }

  async toast() {
    const mensaje = await this.toastController.create({
      message: '¡Ingrese Email y/o Contraseña correctos!',
      position: 'bottom',
      duration: 2500
    });
    mensaje.present();
  }

}
