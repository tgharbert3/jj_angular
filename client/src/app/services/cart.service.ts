import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CartItem {
  quantity: number;
  caption: string;
  price: number;
};

export interface CartResponse {
  message: string,
  cart: {
    [image_id: string]: CartItem;
  };
};

export interface Cart {
  items: CartItem[];
  totalItems?: number;
  totalPrice?: number;
};

export interface EmptyCartResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // private addToCartUrl = 'https://hopper.cis.uncw.edu:5001/cart/add';
  private addToCartUrl = 'http://localhost:5001/cart/add';
  private getCartUrl = 'http://localhost:5001/cart';
  private emptyCartUrl = 'http://localhost:5001/cart/empty';

  currentCart: CartItem[] = [];

  public addToCart(image_id: number, quantity: number, caption: string, price: number) {


    const body = { image_id, quantity, caption, price };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<CartResponse>(this.addToCartUrl, body, { headers, withCredentials: true });
  }

  public getCart(): Observable<CartResponse> {

    return this.http.get<CartResponse>(this.getCartUrl, { withCredentials: true });
  }

  public emptyCart(): Observable<EmptyCartResponse> {
    const body = {};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<EmptyCartResponse>(this.emptyCartUrl, body, { headers, withCredentials: true })
  }

}
