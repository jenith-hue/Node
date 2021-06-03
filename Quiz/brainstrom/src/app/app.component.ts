import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brainstrom';
  status = 'Success';
  showHeader = false;
  constructor(private cookie : CookieService, private route : Router) { 
    this.route.events.subscribe((event : any)=>{
      var userObj : any = this.cookie.getObject('userDetail');
      if(userObj && userObj.fname){
        this.showHeader = true;
      }else{
        this.showHeader = false;
      }
    })
  }
}
