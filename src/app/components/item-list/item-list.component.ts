import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Item} from "../../models/item";
import {ItemService} from "../../services/item.service";
import {Params, ActivatedRoute,Router} from "@angular/router";
import {Http} from "@angular/http";
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-book-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 10;

  public selectedBook : Item;
  public bookList: Item[];
  public serverPath = AppConst.serverPath;

  constructor(public bookService:ItemService, public router: Router, public http: Http, public route:ActivatedRoute) {
    
  }

  onSelect(book:Item) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      if (params['bookList']){
        console.log("filtered book list");
        this.bookList = JSON.parse(params['bookList']);
      } else {
        this.bookService.getBookList().subscribe(
          res => {
            console.log(res.json());
            this.bookList=res.json();
          },
          err => {
            console.log(err);
          }
          );
      }

    });
  }

}
