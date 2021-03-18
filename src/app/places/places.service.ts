import { Injectable } from '@angular/core';
import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {delay, map, switchMap, take, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData{
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

/*
     [
       new Place(
           'p1',
           'Paris',
           'In the heart of Paris',
           'https://www.wallpapertip.com/wmimgs/85-852677_paris-at-night-backgrounds-in-the-ackground-eiffel.jpg',
           199.99,
           new Date('2019-01-01'),
           new Date('2019-01-31'),
           'abc'
       ),
       new Place(
           'p2',
           'Manhattan Mansion',
           'In the heart of New York City',
           'https://www.wallpapertip.com/wmimgs/56-569996_wide-data-src-manhattan-wallpaper-ios-manhattan-wallpaper.jpg',
           189.99,
           new Date('2019-01-01'),
           new Date('2019-01-31'),
           'abc'
       ),
       new Place(
           'p3',
           'The foggy Palace',
           'Not your city average trip',
           'https://www.wallpapertip.com/wmimgs/221-2212606_a-foggy-morning-in-new-york-city-wallpaper.jpg',
           99.99,
           new Date('2019-01-01'),
           new Date('2019-01-31'),
           'abc'
       )
     ]
    * */

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  private places = new BehaviorSubject<Place[]>([]) ;

  getPlaces(){
    return this.places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPlaces(){
    return this.http
        .get<{[key: string]: PlaceData }>('https://ionic-angular-31ba1-default-rtdb.firebaseio.com/offered-places.json')
        .pipe(map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                  new Place
                  (
                      key,
                      resData[key].title,
                      resData[key].description,
                      resData[key].imageUrl,
                      resData[key].price,
                      new Date(resData[key].availableFrom),
                      new Date( resData[key].availableTo),
                      resData[key].userId
                  )
              );
            }
          }
          return places;
          // return [];
          // console.log(resData);
        }),
            tap(places => {
              this.places.next(places);
            })
        );
  }

  getSinglePlace(id: string){
    return this.places.pipe(
        take(1),
        map(places => {
          return {... places.find(p => p.id === id)};
        })
    );
  }

  addPlace(
      title: string,
      description: string,
      price: number,
      dateFrom: Date,
      dateTo: Date
  ){
    let generatedId: string;
    const newPlace = new Place(
        Math.random().toString(),
        title,
        description,
        'https://www.wallpapertip.com/wmimgs/85-852677_paris-at-night-backgrounds-in-the-ackground-eiffel.jpg',
        price,
        dateFrom,
        dateTo,
        this.authService.userId
    );
    return this.http
        .post<{name: string}>('https://ionic-angular-31ba1-default-rtdb.firebaseio.com/offered-places.json',
            {
              ...newPlace,
              id: null
            })
        .pipe(
            switchMap(resData => {
              generatedId = resData.name;
              return this.places;
            }),
            take(1),
            tap(places => {
              newPlace.id = generatedId;
              this.places.next(places.concat(newPlace));
            })
        );
    /*
    return  this.places.pipe(
        take(1),
        delay(1000),
        tap(places => {
          setTimeout(() => {
            this.places.next(places.concat(newPlace));
          }, 1000);
        })
    );
    * */
  }

  onUpdatePlace(placeId: string, title: string, description: string){
    return this.places.pipe(take(1), delay(1000), tap(places => {
      const updatedPlacesIndex = places.findIndex(pl => pl.id === placeId);
      const updatesPlaces = [...places];
      const oldPlace = updatesPlaces[updatedPlacesIndex];
      updatesPlaces[updatedPlacesIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
      );
      this.places.next(updatesPlaces);
    }));
  }

}
