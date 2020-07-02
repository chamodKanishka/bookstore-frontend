import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Item} from "../../models/item";
import {ItemService} from "../../services/item.service";
import {Params, ActivatedRoute,Router} from "@angular/router";
import {Http} from "@angular/http";
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 10;

  public selectedItem : Item;
  public itemList: Item[];
  public serverPath = AppConst.serverPath;

  constructor(public itemService:ItemService, public router: Router, public http: Http, public route:ActivatedRoute) {
    
  }

  onSelect(item:Item) {
    this.selectedItem = item;
    this.router.navigate(['/itemDetail', this.selectedItem.id]);
  }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      if (params['itemList']){
        console.log("filtered item list");
        this.itemList = JSON.parse(params['itemList']);
      } else {
        this.itemService.getItemList().subscribe(
          res => {
            console.log(res.json());
            this.itemList=res.json();
          },
          err => {
            console.log(err);
          }
          );
      }

    });
  }

}
