import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  
  infoGridObj : any = {
    columns : [{
      key : 'id',
      displayName : 'ID',
      link : true
    },{
      key : 'name',
      displayName : 'Quiz Name',
      link : true
    },{
      key : 'type',
      displayName : 'Quiz Type'
    },{
      key : 'status',
      displayName : 'Status'
    },{
      key : 'action',
      displayName : 'Action',
      cell : (row : any,column : any) =>{
        var questionLable = 'Create Questions';
        if(row.status == 'published'){
          questionLable = 'View Questions';
        }
        return {
          click : true,
          html : `<div>${questionLable}</div>`
        }
      }
    }],
    data : []
  }

  name='';
  type='';
  id='';
  status='';

  constructor(private http:HttpClient,private route:Router,private cookie: CookieService) { }

  ngOnInit(): void {
    //var userObj : any = this.cookie.getObject('userDetail');
    this.info();
  }

  info = () =>{
   
    var url : any='http://localhost:3000/getQuiz'
    this.http.get(url).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
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

  quizClick = (eventObj)=>{
    document.getElementById('id01').style.display='block';
    var {row,column} = eventObj;
    if(column.key == 'action'){
      this.route.navigate([`/questionpage/${row.id}`])
    }else{
        this.name=eventObj.row.name;
        this.type=eventObj.row.type;
        this.id=eventObj.row.id;
        this.status=eventObj.row.status;
    }

  }

  clearForm = () =>{
    document.getElementById('id01').style.display='none';
        this.name='';
        this.type='';
        this.id='';
        this.status='';
    
  }

  createquiz = ()=>{

    var data : any =  {
      name:this.name,
      type:this.type,
      id:this.id,
      
    };

    var url : any='http://localhost:3000/createQuiz'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        this.info();
        this.clearForm();
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

  deletequiz = ()=>{

    var data : any =  {
      quizid:this.id,
    };

    var url : any='http://localhost:3000/deleteQuiz'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        this.info();
        this.clearForm();
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


  updatequiz = ()=>{

    var data : any =  {
      name:this.name,
      type:this.type,
      id:this.id,
      status:''
    };

    var url : any='http://localhost:3000/updateQuiz'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        this.info();
        this.clearForm();
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

  publishquiz = ()=>{

    var data : any =  {
      name:this.name,
      type:this.type,
      id:this.id,
      status:'published'
    };

    var url : any='http://localhost:3000/updateQuiz'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        this.info();
        this.clearForm();
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
