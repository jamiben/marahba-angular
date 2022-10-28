import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { getNgModuleById, Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IHotel } from "../models/hotel";
import { HotelData } from "../api/hotel.data";

@Injectable({
    providedIn: 'root'
  })

export class HotelListService {

  private readonly HOTEL_API_URL = "api/hotels";

  constructor(private http: HttpClient) {

  }

  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      tap(hotels => console.log('hotels: ', hotels)),
      catchError(this.handleError)
    );
  }

  public getHotelById(id: number): Observable<IHotel>{
    const url = `${this.HOTEL_API_URL}/${id}`;

    if(id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.http.get<IHotel>(url).pipe(
      catchError(this.handleError)
    );
  }

  public createHotel(hotel: IHotel): Observable<IHotel> {
    hotel = {
      ...hotel,
      imageUrl: 'assets/img/thany.jpg'
    };
console.log('hotel createHotel: ', hotel)
    return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleError)
    );
  }

  public updatehotel(hotel: IHotel): Observable<IHotel> {

    const url = `${this.HOTEL_API_URL}/${hotel.id}222` ;
    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    );
  }

public deleteHotel(id: number): Observable<{}> {
  const url = `${this.HOTEL_API_URL}/${id}`;

  return this.http.delete<IHotel>(url).pipe(
    catchError(this.handleError)
  );
}

  private getDefaultHotel(): IHotel {
    const newHotel = {
      id: 0,
      hotelName: '',
      description: '',
      price: 0,
      rating: 0,
      imageUrl: '',
    };

    return newHotel;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage=`An error occured: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, `+
        `body was: ${error.error}`),
      errorMessage =`Backend returned code ${error.status},`+
        `body was: ${error.error}`;

    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(
      'Something bad happened; please try again later.' +
      '\n' +errorMessage
    ));
  }


}
