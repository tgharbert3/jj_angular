import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartResponse, CartService, CartItem } from '../../services/cart.service';
@Component({
  selector: 'app-view-cart',
  imports: [RouterLink],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss'
})
export class ViewCartComponent implements OnInit {

  cartItems: { [image_id: string]: CartItem } = {};
  cartItemsArray: any = [];
  total: number = 0;

  constructor(private cartService: CartService) { };

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: CartResponse) => {
        this.cartItems = res.cart;
        this.cartItemsArray = Object.entries(this.cartItems).map(([id, item]) => ({ id, ...item, subTotal: item.price * item.quantity }));
        this.calculateTotal();
        console.info(this.cartItemsArray);
        console.log("cart loaded");
      },
      error: (error) => {
        console.error("unable to load cart:", error);
      }
    })
  }

  calculateTotal() {
    this.cartItemsArray.forEach((item: { id: string; quantity: number; caption: string; price: number }) => {

      this.total += item.price * item.quantity;
    });
  }


  emptyCart() {
    this.cartService.emptyCart().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.cartItemsArray = [];
  }
}
