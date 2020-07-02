import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Item} from '../../models/item';
import {Router} from "@angular/router";
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public serverPath = AppConst.serverPath;
  public selectedItem: Item;
  public cartItemList: CartItem[] = [];
  public cartItemNumber: number;
  public shoppingCart: ShoppingCart = new ShoppingCart();
  public cartItemUpdated:boolean;
  public emptyCart: boolean;
  public notEnoughStock: boolean;

  constructor(public router:Router, public cartService: CartService) { }

  onSelect(item:Item) {
    this.selectedItem = item;
    this.router.navigate(['/itemDetail', this.selectedItem.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
        res=>{
          console.log(res.text());
          this.getCartItemList();
          this.getShoppingCart();
        },
        error=>{
          console.log(error.text());
        }
      );
  }

  onUpdateCartItem(cartItem:CartItem) {
    this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
        res=>{
          console.log(res.text());
          this.cartItemUpdated=true;
          this.getShoppingCart();
        },
        error=>{
          console.log(error.text());
        }
      );
  }

  getCartItemList(){
    this.cartService.getCartItemList().subscribe(
        res=>{
          this.cartItemList = res.json();
          this.cartItemNumber = this.cartItemList.length;
        },
        error=>{
          console.log(error.text());
        }
      );
  }

  getShoppingCart(){
    this.cartService.getShoppingCart().subscribe(
      res=>{
          console.log(res.json());
          this.shoppingCart=res.json();
        },
        error=>{
          console.log(error.text());
        }
    );
  }

  onCheckout() {
    if (this.cartItemNumber==0) {
      this.emptyCart=true;
    } else {

      for (let item of this.cartItemList) {
        if(item.qty > item.item.inStockNumber) {
          console.log("not enough stock");

          this.notEnoughStock = true;

          return;
        }
      }

      this.router.navigate(['/order']);
    }
  }

  ngOnInit() {
    this.getCartItemList();
    
    this.getShoppingCart();
  }

}
