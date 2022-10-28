
export interface IHotel{
  id: number;
  hotelName: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
  tags ?: string[];

}

export class Hotel implements IHotel {

  constructor(
    public id: number,
    public  hotelName: string,
    public  description: string,
    public  imageUrl: string,
    public  price: number,
    public  rating: number,
    public  tags: string[],
  ){}

  getNewPrice(price: number): number {
    return price - 5;
  }
}
