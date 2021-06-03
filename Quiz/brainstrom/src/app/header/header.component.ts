import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookie : CookieService, private route : Router) { }

  ngOnInit(): void {
  }
  Logout = () =>{
    this.cookie.remove('userDetail');
    this.route.navigate(['/login']);
  }

}
