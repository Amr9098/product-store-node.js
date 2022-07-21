import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import jwt_decode from "jwt-decode";
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token:any;
  userdata:any;
  check:boolean =false;
  constructor(private router:Router) { }


  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userdata=jwt_decode(this.token);
    console.log(this.userdata);
      if( this.token){
        this.check = true;

      }





  }
  logout(){
    localStorage.removeItem('token');
    // this.router.navigate(['/login']);
    window.location.reload();


  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
