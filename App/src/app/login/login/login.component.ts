import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private route:Router,private cookie: CookieService) { }

  username ='janith@gmail.com';
  password ='jenith';
  reg = '/register';

  ngOnInit(): void {
    var userObj : any = this.cookie.getObject('userDetail');
    if(userObj && userObj.email){
      this.route.navigate(['/cars']);
    }
  }
  login = () =>{
    var data : any =  {
      username:this.username,
      password:this.password
    };
    var url : any='http://localhost:3000/loginUser'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        this.cookie.putObject("userDetail",res.data);
        this.route.navigate(['/info']);
      }
      else
      {
        console.log("111100");
      }
    },(err:any)=>
    {
      console.log(1111);
    });
  };

}
