import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private httpheaders={}

  constructor(private HttpC:HttpClient) {
    this.httpheaders = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    }
  }

  regiseruser(data:Register){
    return this.HttpC.post<Register>(`http://127.0.0.1:8000/api/register`
    ,JSON.stringify(data),this.httpheaders);


  }
  loginuser(data:Register){
    return this.HttpC.post<Register>(`http://127.0.0.1:4000/api/login`
    ,JSON.stringify(data),this.httpheaders);
  }

}
