import { Component, OnInit } from '@angular/core';
import {  map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  pro:Product[]=[];

   httpheaders;
  token:any=localStorage.getItem('token');


  constructor(private route:Router ,private HttpC:HttpClient ,private toastr:ToastrService) {

    this.httpheaders = {
      headers: new HttpHeaders({
        // 'Content-Type':'application/json',
        Authorization: `Bearer ${this.token}`
      })
    }

  }

  ngOnInit(): void {

   this.fetchproduct()
  }

  fetchproduct() {
    this.HttpC
      .get<{ [key: string]: Product }>(
        `http://127.0.0.1:4000/api/myproducts`,this.httpheaders
      )
      .pipe(
        map(responseData => {
          const postsArray: Product[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key]);
            }
          }
          // console.log(postsArray);
          return postsArray;

        })
      )
      .subscribe(posts=> {
        this.pro = posts;

        console.log(this.pro);

      });
  }



}

