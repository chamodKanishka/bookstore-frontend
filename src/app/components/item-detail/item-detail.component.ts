import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Item} from "../../models/item";
import {ItemService} from "../../services/item.service";
import {CartService} from '../../services/cart.service';
import {Params, ActivatedRoute,Router} from "@angular/router";
import {Http} from "@angular/http";
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-book-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  public itemId: number;
  public item: Item = new Item();
  public serverPath = AppConst.serverPath;
  public numberList: number[]=[1,2,3,4,5,6,7,8,9];
  public qty:number;

  public addItemSuccess:boolean = false;
  public notEnoughStock:boolean = false;

  constructor(
    public itemService: ItemService,
    public cartService: CartService,
    public route: ActivatedRoute, 
    public router:Router
    ) {
    this.route.params.forEach((params: Params) => {
      this.itemId = Number.parseInt(params['id']);
    });

    this.itemService.getItem(this.itemId).subscribe(
      res => {
        this.item=res.json();
      },
      error => console.log(error)
    );
  }

  onAddToCart() {
    this.cartService.addItem(this.itemId, this.qty).subscribe(
      res => {
        console.log(res.text());
        this.addItemSuccess=true;
      },
      err => {
        console.log(err.text());
        this.notEnoughStock=true;
      }
    );
  }

  ngOnInit() {
    this.qty=1;
  }

}
