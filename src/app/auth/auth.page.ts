import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(
    private authService : AuthService,
    private router : Router,
    private loadingCtrl : LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin(){
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({keyboardClose : true, message : "Logging in..."}) //create controller overlay
      .then(loadingEl => { //use promise
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();//faking network request dismiss the overlay
          this.router.navigateByUrl('/places/tabs/discover');//make color :))
        }, 1500);
      });
    
    //this.router.navigateByUrl('/places/tabs/discover');
  }

  onSubmit(form : NgForm){
    console.log(form);
  }

  onSwitchAuthModel(){
    this.isLogin = !this.isLogin; //make sure if is true it will change to false and otherwise 
  }
}
