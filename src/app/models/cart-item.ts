import {Item} from './item';
import {ShoppingCart} from './shopping-cart';

export class CartItem {
	public id: number;
	public qty: number;
	public subtotal: number;
	public book: Item;
	public shoppingCart: ShoppingCart
	public toUpdate:boolean;
}
