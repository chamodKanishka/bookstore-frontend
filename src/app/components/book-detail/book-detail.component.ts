import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {CartService} from '../../services/cart.service';
import {Params, ActivatedRoute,Router} from "@angular/router";
import {Http} from "@angular/http";
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  public bookId: number;
  public book: Book = new Book();
  public serverPath = AppConst.serverPath;
  public numberList: number[]=[1,2,3,4,5,6,7,8,9];
  public qty:number;

  public addBookSuccess:boolean = false;
  public notEnoughStock:boolean = false;

  constructor(
    public bookService: BookService, 
    public cartService: CartService,
    public route: ActivatedRoute, 
    public router:Router
    ) {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });

    this.bookService.getBook(this.bookId).subscribe(
      res => {
        this.book=res.json();
      },
      error => console.log(error)
    );
  }

  onAddToCart() {
    this.cartService.addItem(this.bookId, this.qty).subscribe(
      res => {
        console.log(res.text());
        this.addBookSuccess=true;
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
