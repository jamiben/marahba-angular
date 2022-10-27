import { identifierName } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/list-hotels.service';
import { GlobalGenericValitator } from '../shared/validators/global-generic-validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})

export class HotelEditComponent implements OnInit, AfterViewInit {

  public hotelForm!: FormGroup;

  public hotel!: IHotel;

  public pageTitle!: string;

  public errorMessage!: string;

  public formErrors: { [key: string]: string} = {};


  private validationMessages: { [key: string]: {[key: string]: string}} = {

    hotelName: {
      required: "the name of the hotel is required"
    },
    price: {
      required: "the price is required"
    }
  }

  private globalGenericValitator!: GlobalGenericValitator;

  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private hotelService: HotelListService,

    private router: Router,
  ){ }

  ngOnInit(): void {
    this.globalGenericValitator = new GlobalGenericValitator(this.validationMessages);
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


  ngAfterViewInit(): void {

    this.formErrors = this.globalGenericValitator.createErrorMessages(this.hotelForm)
  }


  public hideError(): void {
    this.errorMessage = '';
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
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
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
          next: () => this.saveCompleted(),
          error: (err) => this.errorMessage = err

        });
      }else {
        this.hotelService.updatehotel(hotel).subscribe({
          next: () => this.saveCompleted(),
          error: (err) => this.errorMessage = err
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
