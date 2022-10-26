import { Component } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHotel } from '../models/hotel';


export class HotelData implements InMemoryDbService {

  createDb(): Record<string, IHotel[]> {

    const hotels: IHotel[] = [
      {
        id: 1,
        hotelName:"Thany",
        description:"lorem ipsum",
        imageUrl:"assets/img/thany.jpg",
        price:200.60,
        rating:3.5

      },
      {
        id:2,
        hotelName:"Marahba",
        description:"lorem ipsum",
        imageUrl:"assets/img/marhaba.jpg",
        price:300.2,
        rating:5
      },
      {
        id:3,
        hotelName:"Lesehan",
        description:"lorem ipsum",
        imageUrl:"assets/img/lesehan-cahayah.png",
        price:400.5,
        rating: 3.5
      }
    ]

    return { hotels };
  }
}
