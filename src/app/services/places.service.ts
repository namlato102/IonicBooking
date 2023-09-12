import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { AuthService } from './auth.service';
import { BehaviorSubject, delay, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    //added some dummy place construction into an array
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the heart of New York City",
      "https://thumbs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg?w=800&format=webp",
      149.99,
      new Date('2023-01-01'),
      new Date('2023-12-31'),
      'abc'
    ),
    new Place(
      "p2",
      "L'Amour Toujours",
      "A romantic place in Paris",
      "https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg",
      189.99,
      new Date('2023-01-01'),
      new Date('2023-12-31'),
      'abc'
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not your average city trip!",
      "https://www.miabid.com/images/portfolio/germany-hannover-castle-marienburg-aerial-foggy-morning-900.jpg",
      99.99,
      new Date('2023-01-01'),
      new Date('2023-12-31'),
      'abc'
    ),
  ]);

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
    private authService : AuthService
  ) { }

  getPlace(id : string){
    return this.places.pipe(take(1), map(places =>{
      return {...places.find(p => p.id === id)};
      
    }));
    // clone that entire _place object using spread operator then i pull out all the properties of Place model, which i retrieved here
    //and add them into a object.
  }

  //newly added 
  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date){
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
    //this._places.push(newPlace); //push it into the array
    //event emitter
    return this._places.pipe(take(1), delay(1000), tap(places => {
      this._places.next(places.concat(newPlace));
      })
    )
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

      
