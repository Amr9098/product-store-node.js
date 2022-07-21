import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { upuser } from 'src/app/models/register';
import {  map } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token:any;
  userdata:any;
  datau:upuser[]=[];

  form!:FormGroup;
  private httpheaders;

    er:any;
  constructor(private formBulider:FormBuilder,private toastr: ToastrService,private HttpC:HttpClient ) {
    this.token = localStorage.getItem('token');
    this.userdata=jwt_decode(this.token);

    this.form = this.formBulider.group({
      name:'',
      email:'',
    });
    this.httpheaders = {
      headers: new HttpHeaders({
        // 'Content-Type':'application/json',
        Authorization: `Bearer ${this.token}`
      })
    }



  }

  ngOnInit(): void {

    this.fetchuserdata();
  }


  editfun(){

      console.log(this.form.getRawValue());

      this.HttpC.put<upuser>(`http://127.0.0.1:4000/api/updateProfile`
    ,this.form.getRawValue(),this.httpheaders).subscribe({
      next: data => {

        this.toastr.success( "cd",'success' );


      },
      error: error => {
        this.er= error
        console.log( this.er );



        this.toastr.success( this.er.error.text,'success' );
        window.location.reload();

      }
    });





  }

  fetchuserdata() {
    this.HttpC
      .get<{ [key: string]: upuser }>(
        `http://127.0.0.1:4000/api/profile`,this.httpheaders
      )
      .pipe(
        map(responseData => {
          const postsArray: upuser[] = [];
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


        this.datau = posts;
        // console.log(this.datau);

      });
  }

}
