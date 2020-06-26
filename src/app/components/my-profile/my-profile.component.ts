import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {PaymentService} from "../../services/payment.service";
import {ShippingService} from "../../services/shipping.service";
import {OrderService} from "../../services/order.service";
import {User} from '../../models/user';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {UserShipping} from '../../models/user-shipping';
import {Order} from '../../models/order';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public serverPath = AppConst.serverPath;
  public dataFetched=false;
  public loginError:boolean = false;
  public loggedIn = false;
  public credential = {'username':'', 'password':''};

  public emailSent:boolean = false;
  public usernameExists:boolean = false;
  public emailExists:boolean = false;
  public username:string;
  public email:string;

  public emailNotExists: boolean = false;
  public forgetPasswordEmailSent: boolean = false;
  public recoverEmail:string;

  public user: User = new User();
  public updateSuccess:boolean;
  public newPassword:string;
  public incorrectPassword:boolean;
  public currentPassword: string;
  public userPayment: UserPayment = new UserPayment();
  public userBilling: UserBilling = new UserBilling();
  public userPaymentList: UserPayment[] = [];  
  public userShipping: UserShipping = new UserShipping();
  public userShippingList: UserShipping[] = [];
  public stateList: string[] = [];

  public selectedProfileTab:number = 0;
  public selectedBillingTab:number = 0;
  public selectedShippingTab:number = 0;

  public defaultUserPaymentId:number;
  public defaultPaymentSet:boolean;

  public defaultUserShippingId:number;
  public defaultShippingSet: boolean;

  public orderList: Order[] = [];
  public order:Order = new Order();
  public displayOrderDetail:boolean;

  constructor (
    public paymentService:PaymentService, 
    public shippingService:ShippingService,
    public loginService: LoginService, 
    public userService: UserService, 
    public orderService: OrderService,
    public router: Router
    ){
  }

  selectedShippingChange(val :number ){
    this.selectedShippingTab=val;
  }

  selectedBillingChange(val :number ){
    this.selectedBillingTab=val;
  }

  onLogin() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res=>{
        console.log(res);
        localStorage.setItem("xAuthToken", res.json().token);
        this.loggedIn=true;
        location.reload();
        this.router.navigate(['/home']);
      },
      error=>{
        this.loggedIn=false;
      }
      );
  }

  onNewAccount() {
    this.usernameExists=false;
    this.emailExists=false;
    this.emailSent = false;
    
    this.userService.newUser(this.username, this.email).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="usernameExists") this.usernameExists=true;
        if (errorMessage==="emailExists") this.emailExists=true;
      }
      );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;
    
    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="usernameExists") this.usernameExists=true;
        if (errorMessage==="emailExists") this.emailExists=true;
      }
      );
  }

  onUpdateUserInfo() {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      res => {
        console.log(res.text());
        this.updateSuccess = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="Incorrect current password!") this.incorrectPassword=true;
      }
      );
  }

  onDisplayOrder (order:Order) {
    console.log(order);
    this.order=order;
    this.displayOrderDetail=true;
  }

  onNewPayment () {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  onUpdatePayment(payment:UserPayment) {
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;

  }

  onRemovePayment(id:number) {
    this.paymentService.removePayment(id).subscribe(
      res => {
        this.getCurrentUser();

      },
      error => {
        console.log(error.text());
      }
      );
  }

  setDefaultPayment() {
    this.defaultPaymentSet=false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet=true;
        // this.selectedProfileTab = 2;
        // this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  onNewShipping () {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedShippingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  onUpdateShipping(shipping:UserShipping) {
    this.userShipping = shipping;
    this.selectedShippingTab=1;
  }

  onRemoveShipping(id:number) {
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUser();

      },
      error => {
        console.log(error.text());
      }
      );
  }

  setDefaultShipping() {
    this.defaultShippingSet=false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet=true;
        // this.selectedProfileTab = 2;
        // this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user=res.json();
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList;

        for (let index in this.userPaymentList) {
          if (this.userPaymentList[index].defaultPayment) {
            this.defaultUserPaymentId=this.userPaymentList[index].id;
            break;
          }
        }

        for (let i in this.userShippingList) {
          if (this.userShippingList[i].userShippingDefault) {
            this.defaultUserShippingId=this.userShippingList[i].id;
            break;
          }
        }

        this.dataFetched=true;
      },
      error => {
        console.log(error);
      }
      );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
        console.log("inactive session");
        this.router.navigate(['/myAccount']);
      }
      );

    this.orderService.getOrderList().subscribe(
      res => {
        this.orderList = res.json();
      },
      error => {
        console.log(error.text());
      }
      );

    this.getCurrentUser();

    for (let s in AppConst.usStates) {
    	this.stateList.push(s);
    }

    this.userBilling.userBillingState="";
    this.userPayment.type="";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet=false;

    this.userShipping.userShippingState="";
    this.defaultShippingSet=false;



  }
}
