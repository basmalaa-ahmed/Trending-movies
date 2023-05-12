import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService,private _Router:Router) {

  }
  loading:boolean=false;
  apiError:string='';
  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.maxLength(9),Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email,Validators.pattern(/.com$/)]),
    phone:new FormControl(null,[Validators.pattern(/^01[0125][0-9]{8}$/),Validators.required]),
    password:new FormControl(null,[Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),Validators.required]),
    rePassword:new FormControl(null),



  },{validators: this.rePasswordMatch})
  rePasswordMatch(registerForm:any){
    let passwordContorol= registerForm.get('password');
    let rePasswordContorol= registerForm.get('rePassword');
    if(passwordContorol.value==rePasswordContorol.value){
      return null;
    }
    else{
      rePasswordContorol.setErrors({passwordMatch : "password and repassword don't match"})
      return {passwordMatch :"password and repassword don't match"}
    }

  

  }
 
  registerData(registerForm:FormGroup){
    console.log(registerForm)
    if(registerForm.valid){
      this.loading=true;
      this._AuthService.register(registerForm.value).subscribe({
        next:(response)=>{
          console.log(response)
          if(response.message=='success'){
            this._Router.navigate(['/login'])
            this.loading=false;
          }
         
        },
        error:(err)=>{
          console.log(err);
          this.loading=false;
          this.apiError=err.error.message
          
        }
        
      })
    }

  }

}
