import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/list-hotels.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {


  public hotelForm!: FormGroup;

  public hotel!: IHotel;

  public pageTitle!: string;


  constructor(


    private fb: FormBuilder,

    private route: ActivatedRoute,

    private hotelService: HotelListService,

    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      price: ['', Validators.required],
      starRating: [''],
      description: [''],
      tags: this.fb.array([])
    });

    this.route.paramMap.subscribe(params =>{
      const id = params.get('id');
      // console.log(id);

      if(id !== null) this.getSelectedHotel(parseInt(id));
    });
  }

  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTags(): void {
    this.tags.push(new FormControl());
  }

public deleteTag(index: number): void {
  this.tags.removeAt(index);
  this.tags.markAsDirty();
}

  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe((hotel: IHotel) => {
      this.displayHotel(hotel);
    });
  }

  public displayHotel(hotel: IHotel): void {

    this.hotel = hotel;

    if(this.hotel.id === 0) {
      this.pageTitle = 'Editez un nouvel hotel';
    } else {
        this.pageTitle = `Modifiez les données de l'hotel ${this.hotel.hotelName}`;
    }

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description,
    });
  }

  public saveHotel(): void {
    if(this.hotelForm.valid) {
      if(this.hotelForm.dirty) {

        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value
        };

      if(hotel.id === 0) {
        this.hotelService.createHotel(hotel).subscribe({
          next: () => this.saveCompleted()
        });
      }else {
        this.hotelService.updatehotel(hotel).subscribe({
          next: () => this.saveCompleted()
        });
      }
      }
    }
    console.log(this.hotelForm.value);
  }
  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels'])
  }

  public deleteHotel(): void {
    if(confirm(`voulez-vous réellement supprimer ${this.hotel.hotelName}? `)){
      this.hotelService.deleteHotel(this.hotel.id).subscribe({
        next: () => this.saveCompleted()
      });
    }
  }
}
