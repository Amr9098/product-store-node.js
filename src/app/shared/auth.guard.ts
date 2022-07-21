import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token:any;
  userto:any;
  constructor(private router:Router,){}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.token =localStorage.getItem('token');
      if(this.token){
        return true;
      }else{
        this.router.navigate(['/login']);
      }

        return false;

  }


}
