import { Component, OnInit } from "@angular/core";
import{ IHotel } from '../shared/models/hotel';
import { HotelListService } from "../shared/services/list-hotels.service";


@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css']
})
export class ListHotelsComponent implements OnInit {

  public title = 'Marahba';

  public titleHotel = "Nos acceuillants";
  public hotels: IHotel[]= [];

  public showBadge: boolean = true;

  private _hotelFilter = 'mot';

  public filteredHotels: IHotel[] = [];

  public receivedRating: string = '';

  public errMsg: string = '';

constructor(private hotelListService: HotelListService) {

}

  ngOnInit(){
    this.hotelListService.getHotels().subscribe({
      next: hotels => {
        this.hotels = hotels;
        this.filteredHotels = this.hotels;
      },
      error: err => this.errMsg = err
    });
    this.hotelFilter = '';
  }

  public toggleIsNewBadge(): void{
    this.showBadge = !this.showBadge;
  }

  public get hotelFilter(): string {
    return this._hotelFilter;
  }

  public set hotelFilter(filter: string) {
    this._hotelFilter = filter;
    this.filteredHotels = this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
  }

  public receiveRatingClicked(message: string): void{
    this.receivedRating = message;
  }

  private filterHotels(criteria: string): IHotel[] {
    criteria = criteria.toLocaleLowerCase();

    const res = this.hotels.filter(
      (hotel: IHotel) => hotel.hotelName.toLocaleLowerCase().indexOf(criteria) ! -1
    );
  return res;
  }

}
