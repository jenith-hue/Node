import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient,private route:Router) { }

  username = '';
  fname = '';
  lname = '';
  role = '';
  phone = '';
  password = '';

  ngOnInit(): void {
  }

 

  register = () =>{
    var data : any =  {
      username:this.username,
      fname:this.fname,
      lname:this.lname,
      role:this.role ? 'admin' : 'user',
      phone:this.phone,
      password:this.password

    };
    var url : any='http://localhost:3000/register'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        this.route.navigate(['/login']);
      }
    },(err:any)=>
    {
    });
  };

}
