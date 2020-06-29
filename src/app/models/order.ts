import {CartItem} from "./cart-item";
import {BillingAddress} from "./billing-address";
import {Payment} from "./payment";
import {ShippingAddress} from "./shipping-address";

export class Order {
    public id:number;
    public orderDate: string;
    public shippingDate: string;
    public shippingMethod: string;
    public orderStatus: string;
    public orderTotal: number;
    public billingAddress: BillingAddress;
    public payment: Payment;
    public shippingAddress: ShippingAddress;
    public cartItemList: CartItem[];
}
