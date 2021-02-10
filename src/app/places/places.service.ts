import { Injectable } from '@angular/core';
import {Place} from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] = [
    new Place(
        'p1',
        'Paris',
        'In the heart of Paris',
        'https://www.wallpapertip.com/wmimgs/85-852677_paris-at-night-backgrounds-in-the-ackground-eiffel.jpg',
        199.99,
        new Date('2019-01-01'),
        new Date('2019-01-31')
    ),
    new Place(
        'p2',
        'Manhattan Mansion',
        'In the heart of New York City',
        'https://www.wallpapertip.com/wmimgs/56-569996_wide-data-src-manhattan-wallpaper-ios-manhattan-wallpaper.jpg',
        189.99,
        new Date('2019-01-01'),
        new Date('2019-01-31')
    ),
    new Place(
        'p3',
        'The foggy Palace',
        'Not your city average trip',
        'https://www.wallpapertip.com/wmimgs/221-2212606_a-foggy-morning-in-new-york-city-wallpaper.jpg',
        99.99,
        new Date('2019-01-01'),
        new Date('2019-01-31')
    )

  ];

  getPlaces(){
    return [ ... this.places];
  }

  getSinglePlace(id: string){
    return {... this.places.find(p => p.id === id)};
  }

  constructor() { }
}
