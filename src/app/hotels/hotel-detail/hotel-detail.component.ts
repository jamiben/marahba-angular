import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from "../shared/services/list-hotels.service";



@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel: IHotel = <IHotel>{};

  constructor(

    private route: ActivatedRoute,

    private hotelService: HotelListService,

    private router: Router,
  ){}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;

    this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {
      // this.hotel = hotels.find(hotel => hotel.id === id);
      this.hotel = hotels.find((hotel: IHotel) => hotel.id === id)!;
//
    })
  }

  public backToList(): void {
    this.router.navigate(['/hotels']);
  }
}
