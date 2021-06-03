import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {


  infoGridObj : any = {
    columns : [{
      key : 'id',
      displayName : 'ID'
    },{
      key : 'firstname',
      displayName : 'First Name'
    },{
      key : 'lastname',
      displayName : 'Last Name'
    },{
      key : 'role',
      displayName : 'Role'
    },{
      key : 'email',
      displayName : 'Email'
    },{
      key : 'phone',
      displayName : 'Phone'
    },{
      key : 'reg_date',
      displayName : 'Registered Date'
    }],
    data : []
  }

  constructor(private http:HttpClient) { 
    
  }

  ngOnInit(): void {
    this.info();
    
  }
  info = () =>{
   
    var url : any='http://localhost:3000/registerInfo'
    this.http.get(url).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        console.log(res.data);
        this.infoGridObj.data = res.data;
      }
      else
      {
        console.log("2222");
      }
    },(err:any)=>
    {
      console.log(3333);
    });
  };


}
