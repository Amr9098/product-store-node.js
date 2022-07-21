import { Component, OnInit } from '@angular/core';
import {  map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { conorder } from 'src/app/models/product';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  conf_orders:conorder[]=[];
  private httpheaders;
  token:any=localStorage.getItem('token');
  er:any ;
  Ordcount:number=0;

  conf:any ;

  constructor( private HttpC:HttpClient ,private toastr:ToastrService) {
    this.httpheaders = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: `Bearer ${this.token}`
      })
    }
  }

  ngOnInit(): void {

    this.fetchconf_orders();
  }


  fetchconf_orders() {
    this.HttpC
      .get<{ [key: string]: conorder }>(
        `http://127.0.0.1:4000/api/getOrdersToConfirm`,this.httpheaders
      )
      .pipe(
        map(responseData => {
          const postsArray: conorder[] = [];
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
        this.conf_orders = posts;
        this.Ordcount=this.conf_orders.length;
        console.log(this.conf_orders);


      });
  }


  confirmorder(id:number){

    alert(this.token);

    this.HttpC.put(`http://127.0.0.1:4000/api/confirmOrder/${id}`,this.httpheaders).subscribe({
      next: data => {
        this.conf=data;
        console.log( this.conf);
        this.toastr.success( this.conf.msg,'success' );
        window.location.reload();


      },
      error: error => {
          this.conf=error;
          console.log(this.conf);


        this.toastr.error( this.conf.error.msg,'success' );

      }
    });

  }
  deletorder(id:number){
    this.HttpC.delete(`http://127.0.0.1:4000/api/rejectOrder/${id}`,this.httpheaders).subscribe({
      next: data => {
        this.conf=data;
        console.log( this.conf);
        this.toastr.success( this.conf.msg,'success' );
        // window.location.reload();


      },
      error: error => {
          this.conf=error;
          console.log( this.conf);


        this.toastr.success( "delete order success",'success' );

      }
    });

  }



}
