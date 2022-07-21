import { Component, OnInit } from '@angular/core';
import { addProduct, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {  map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  neword:addProduct={} as addProduct;

  pro:Product[]=[];
  private httpheaders;
  token:any=localStorage.getItem('token');
  er:any ;

  constructor( private route:Router ,private HttpC:HttpClient ,private toastr:ToastrService) {
    this.httpheaders = {
      headers: new HttpHeaders({
        // 'Content-Type':'application/json',
        Authorization: `Bearer ${this.token}`
      })
    }


  }

  ngOnInit(): void {

    console.log(this.token);

    this.fetchproduct();
  }

  fetchproduct() {
    this.HttpC
      .get<{ [key: string]: Product }>(
        `http://127.0.0.1:4000/api/product`
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

      });
  }

  addtoorder(id:number){
    this.neword.pro_id = id;
    this.HttpC.post<addProduct>(`http://127.0.0.1:4000/api/order`
    ,(this.neword),this.httpheaders).subscribe({
    next: data => {
      console.log(data);

    },
    error: error => {
      // console.log(error);
      this.er = error;
      console.log(this.er);
        if(this.er.status === 401) {
          this.toastr.error( this.er.error.msg , 'error');
          this.route.navigate(['log']);

        }else
      this.toastr.success( this.er.error.text , 'success');
    }
});

  }

}
