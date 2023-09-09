import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place !: Place; 
  form !: FormGroup;

  constructor(
    private activatedRoute : ActivatedRoute,
    private placesService : PlacesService,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    //with acivatedRouted automatically update, because subscribtion listen to changes in the urls will always be live
    /*
    In summary, this code snippet handles the case where the "placeId" route parameter is missing, 
    and if it exists, it retrieves details about a place using that parameter by calling a service method (getPlace). 
    This is a common pattern in Angular applications for routing and parameter handling.
    */
    /*
    sử dụng ActivatedRoute để truy cập thông tin về địa chỉ URL hiện tại và các tham số của nó.
    It uses the ActivatedRoute to subscribe to changes in the route parameters. example: /places/tabs/offers/123
    The paramMap observable emits whenever there's a change in the route parameters. 
    if anychange in route parameter callback function in subscribe will be execute
    this run asynchronously
    */
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has("placeId")){
        //redirecting
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }

      //If the "placeId" parameter does exist in the route, 
      //it retrieves its value using paramMap.get('placeId') and assigns it to the placeId variable.
      //this.place = this.placesService.getPlace(paramMap.get('placeId'));
      const placeid = paramMap.get('placeId');
      if (placeid !== null){
        //fetches details about a place based on its unique identifier, which is the "placeId."
        this.place = this.placesService.getPlace(placeid);
        this.form = new FormGroup({
          title : new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description : new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        })
      }  
    });
  }

  onUpdateOffer(){
    if(!this.form.valid){
      return;
    }
    this.navCtrl.navigateBack("/places/tabs/offers");
    console.log(this.form);
  }

}
