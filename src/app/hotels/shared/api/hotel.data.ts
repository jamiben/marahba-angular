import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHotel } from '../models/hotel';

export class HotelData Implements InMemoryDbService {

  createDb(): Record<string IHotel[]> {

    const hotels: IHotel[] = [
      {
        id: 1,
        hotelName:"Thany",
        hotelDescription:"lorem ipsum",
        hotelImageUrl:"assets/img/thany.jpg",
        hotelPrice:200.60,
        rating:3.5

      },
      {
        id:2,
        hotelName:"Marahba",
        hotelDescription:"lorem ipsum",
        hotelImageUrl:"assets/img/marhaba.jpg",
        hotelPrice:300.2,
        rating:5
      },
      {
        id:3,
        hotelName:"Lesehan",
        hotelDescription:"lorem ipsum",
        hotelImageUrl:"assets/img/lesehan-cahayah.png",
        hotelPrice:400.5,
        rating: 3.5
      }
    ],

    return { hotels };
  }
}
