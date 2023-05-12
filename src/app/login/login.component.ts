import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router    ) {

  }
  loading:boolean=false;
  apiError:string='';
  passwordError:string='';
  verifyError:string='';
  nwePassMes:string='';
  resetError:string='';
  forgetShow:boolean=true;
  verifyShow:boolean=false;
  newPassShow:boolean=false;
  loginForm:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
  })
  Login(loginForm:FormGroup){
    if(loginForm.valid){
      this.loading=true;
       this._AuthService.login(loginForm.value).subscribe({
        next:(response)=>{
          console.log(response)
          this.loading=false;
          if(response.message=='success'){
            localStorage.setItem('userToken', response.token)
            this._AuthService.decodeData()
            this._Router.navigate(['/home'])

          }
          
        },
        error:(err)=>{
          console.log(err)
          this.loading=false
          this.apiError=err.error.message;
        }
      })
    }
  }
}
