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
    
  username ='jenith';
  password ='jenith111';



  ngOnInit(): void {
    var userObj : any = this.cookie.getObject('userDetail');
    if(userObj && userObj.username=='admin'){
      this.route.navigate(['/adminpage']);
    }
    else
    {
      this.route.navigate(['/userpage']);

    }
  }

  login = () =>{
    var data : any =  {
      username:this.username,
      password:this.password
    };
    var url : any='http://localhost:3000/login'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success' )
      {
        //console.log(res.data.role);
        this.cookie.putObject("userDetail",res.data);
        if(res.data.role=='admin')
        {
        this.route.navigate(['/adminpage']);
      }
      else{
        this.route.navigate(['/userpage']);
      }
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
