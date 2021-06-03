import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-questionpage',
  templateUrl: './questionpage.component.html',
  styleUrls: ['./questionpage.component.css']
})
export class QuestionpageComponent implements OnInit {


  infoGridObj : any = {
    columns : [{
      key : 'id',
      displayName : 'ID',
      link : true
    },{
      key : 'quiz_id',
      displayName : 'Quiz Id',
      link : true
    },{
      key : 'question',
      displayName : 'Question'
    },{
      key : 'answer',
      displayName : 'Answer'
    },{
      key : 'type',
      displayName : 'Type'
    },{
      key : 'choice',
      displayName : 'Choice'
    }],
    data : []
  }

  quiz_id='';
  editablequiz:any=false;

  constructor(private http:HttpClient,private route:Router,private cookie: CookieService,private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.quiz_id = this.activeroute.snapshot.params['id'];
    this.getquizdetail();
    this.getquestions();
  }

  getquizdetail = () =>{

    var data : any =  {
      quiz_id:this.quiz_id,    
    };
   
    var url : any='http://localhost:3000/getQuizDetail'
    this.http.post(url,data).toPromise().then((res:any)=>{
      if(res.status == 'success')
      {
        if(res.data[0].status=='published')
        {
          this.editablequiz=false;
        }
        else{
          this.editablequiz=true;
        }
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

  getquestions = () =>{

    var data : any =  {
      quiz_id:this.quiz_id,    
    };
   
    var url : any='http://localhost:3000/getQuestionList'
    this.http.post(url,data).toPromise().then((res:any)=>{
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

}
