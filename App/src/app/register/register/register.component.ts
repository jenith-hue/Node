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

  fname = '';
  lname = '';
  role = '';
  email = '';
  phone = '';
  password = '';
  logi='/login';


  ngOnInit(): void {
  }

  register = () =>{
    var data : any =  {
      fname:this.fname,
      lname:this.lname,
      role:this.role ? 'admin' : 'user',
      email:this.email,
      phone:this.phone,
      password:this.password

    };
    var url : any='http://localhost:3000/registerUser'
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
