import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data:any;
  err:any;
  form !:FormGroup;

  constructor(private formBulider:FormBuilder , private httpc:HttpClient ,private toastr: ToastrService , private route:Router) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      name: '',
      email:'',
      password:'',

    })



  }

  submitfun(){

      if(this.form.getRawValue().name === '' || this.form.getRawValue().email === '' || this.form.getRawValue().password === ''){

        this.toastr.error( 'pleace enter valid data','Error' );

      }else{
    this.httpc.post('http://127.0.0.1:4000/api/register',this.form.getRawValue()).subscribe(
    {

      next: data => {

        this.data=data;
        console.log(this.data);

        this.toastr.success( this.data.message, 'success' );
          this.route.navigate(['/login']);
      },
      error: error => {
          console.log(error);
          this.err=error;

        this.toastr.error( this.err.error.message,'Error' );

      }


    }
    )
  }}
}
