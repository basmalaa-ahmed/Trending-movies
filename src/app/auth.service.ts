import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private _HttpClient:HttpClient, private _Router:Router){
  if (localStorage.getItem('userToken') !==null){
    this.decodeData();
  }
}
register(userData:object):Observable<any>
{
  return this._HttpClient.post(' https://route-ecommerce.onrender.com/api/v1/auth/signup',userData)
}
login(userData:object):Observable<any>
{
  return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',userData)
}
user = new BehaviorSubject(null);
decodeData(){
  let incodedToken =JSON.stringify(localStorage.getItem('userToken')) 
  let decodedToken:any = jwtDecode(incodedToken);
  this.user.next(decodedToken)
  console.log(this.user)
}
signOut(){
  localStorage.removeItem('userToken');
  this.user.next(null);
  this._Router.navigate(['/login'])
}
forgetPassword(userData:any):Observable<any>{
  return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,userData)
}
verifyPassword(userData:any):Observable<any>{
  return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,userData)
}
newPassword(userData:any):Observable<any>{
  return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,userData)
}
}
