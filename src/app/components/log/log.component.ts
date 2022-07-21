import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  da:any ;
  err:any ;
  token:any;

    form!:FormGroup;
  constructor(private formBulider:FormBuilder,private datas:DataService,private toastr: ToastrService , private location: Location ,private route:Router) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      email:'',
      password:'',
    })

  }
  loginfun(){
    console.log(this.form.getRawValue());


    this.datas.loginuser(this.form.getRawValue()).subscribe({
      next: data => {

        this.da=data;
        console.log(data);
          this.token=this.da.token;
          localStorage.setItem('token',this.token);

          this.toastr.success( this.da.msg ,'success' );
          this.route.navigateByUrl('home')

      },
      error: error => {
        // alert("error"+error);
        console.log(error);
        this.err=error;

        this.toastr.error( this.err.error.msg,'Error' );

      }
    });


}
}
