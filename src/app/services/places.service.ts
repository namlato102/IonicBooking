import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { AuthService } from './auth.service';
import { BehaviorSubject, delay, map, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl : string;
  price: number;
  title: string;
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  // private _places = new BehaviorSubject<Place[]>([
  //   //added some dummy place construction into an array
  //   new Place(
  //     "p1",
  //     "Manhattan Mansion",
  //     "In the heart of New York City",
  //     "https://thumbs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg?w=800&format=webp",
  //     149.99,
  //     new Date('2023-01-01'),
  //     new Date('2023-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     "p2",
  //     "L'Amour Toujours",
  //     "A romantic place in Paris",
  //     "https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg",
  //     189.99,
  //     new Date('2023-01-01'),
  //     new Date('2023-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     "p3",
  //     "The Foggy Palace",
  //     "Not your average city trip!",
  //     "https://www.miabid.com/images/portfolio/germany-hannover-castle-marienburg-aerial-foggy-morning-900.jpg",
  //     99.99,
  //     new Date('2023-01-01'),
  //     new Date('2023-12-31'),
  //     'abc'
  //   ),
  // ]);

  //getter: get name place without an underscore 
  //return a copy of this._place so can be able to edit the array from other places where we get access to that array
  /*
  get places(){
    return [...this._places];
  }
  */
  
  //cause it is a subject 
  get places(){
    return this._places.asObservable();//create a obsevable
  }

  

  constructor(
    private authService : AuthService,
    private http : HttpClient,
  ) { }


  //return a obsevable
  fetchPlace(){
    return this.http
      .get<{[key: string]: PlaceData}>('https://ionic-booking-dcef5-default-rtdb.firebaseio.com/offered-places.json')
      .pipe(
        map(resData => {
          const places: any[] = [];
          for(const key in resData){
            if(resData.hasOwnProperty(key)){
              places.push(
                new Place(
                  key, 
                  resData[key].title, 
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);//update places list place behavior subject by emit new event
        })
      );
  }

  getPlace(id : string){
    return this.places.pipe(take(1), map(places =>{
      return {...places.find(p => p.id === id)};
      
    }));
    // clone that entire _place object using spread operator then i pull out all the properties of Place model, which i retrieved here
    //and add them into a object.
  }

  //newly added 
  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date){
    let generatedId : string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sha rp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.http
      .post<{name: string}>('https://ionic-booking-dcef5-default-rtdb.firebaseio.com/offered-places.json', {...newPlace, id: null})
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;//from the firebase
        return this.places;
      }),
        take(1),
        tap(places => { //need the tap one
          newPlace.id = generatedId; 
          this._places.next(places.concat(newPlace));
        })  
      );
    //this._places.push(newPlace); //push it into the array
    //event emitter if i delete this no place appeared on offer or discovery
    // return this._places.pipe(take(1), delay(1000), tap(places => {
    //   this._places.next(places.concat(newPlace));
    //   })
    // )
  }

  updatePlace(placeId: string, title: string, description: string){
    //return subcription so that we can listen to it in edit offer
    //take(1) get the latest snapshot of the list and not any future updates, if updated again , would be a separate operation
    return this.places.pipe(
      take(1), 
      delay(1000), 
      tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, 
        title, 
        description, 
        oldPlace.imageUrl, 
        oldPlace.price, 
        oldPlace.availableFrom, 
        oldPlace.availableTo
        );
        this._places.next(updatedPlaces);
    }))
  }
}

      
