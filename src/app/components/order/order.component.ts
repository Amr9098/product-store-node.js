import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { addProduct, Iorders, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {  map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnChanges {

  orde:Iorders[]=[];
  private httpheaders;
  token:any=localStorage.getItem('token');
  er:any ;
  Ordcount:number=0;



  constructor(private apiproduct:ProductService ,private HttpC:HttpClient ,private toastr:ToastrService) {

    this.httpheaders = {
      headers: new HttpHeaders({
        // 'Content-Type':'application/json',
        Authorization: `Bearer ${this.token}`
      })
    }
  }
  ngOnChanges(): void {
    this.fetchorders();


  }

  ngOnInit(): void {
    this.fetchorders();

  }



  fetchorders() {
    this.HttpC
      .get<{ [key: string]: Iorders }>(
        `http://127.0.0.1:4000/api/get_order`,this.httpheaders
      )
      .pipe(
        map(responseData => {
          const postsArray: Iorders[] = [];
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
        this.orde = posts;
        this.Ordcount=this.orde.length;

      });
  }

  removeorders(id:number){
    this.HttpC.delete(`http://127.0.0.1:4000/api/delete_order/${id}`,this.httpheaders).subscribe({
      next: data => {

        this.toastr.success( "",'success' );


      },
      error: error => {


        this.toastr.success( "delete order success",'success' );

      }
    });

  }
  removeall(){
    this.HttpC.delete(`http://127.0.0.1:4000/api/delete_all`,this.httpheaders).subscribe({
      next: data => {
        this.toastr.success( "",'success' );


      },
      error: error => {


        this.toastr.success( "delete order success",'success' );

      }
    });

  }


}
