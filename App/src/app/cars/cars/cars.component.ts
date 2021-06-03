import { Component, OnInit  } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {


  carGridObj : any = {
    columns : [{
      key : 'Name',
      displayName : 'Name'
    },{
      key : 'Miles_per_Gallon',
      displayName : 'Miles per Gallon'
    },{
      key : 'Cylinders',
      displayName : 'Cylinders'
    },{
      key : 'Displacement',
      displayName : 'Displacement'
    },{
      key : 'Horsepower',
      displayName : 'Horsepower'
    },{
      key : 'Weight_in_lbs',
      displayName : 'Weight (lbs)'
    },{
      key : 'Acceleration',
      displayName : 'Acceleration'
    },{
      key : 'Year',
      displayName : 'Year'
    },{
      key : 'Origin',
      displayName : 'Origin'
    }],
    data : []
  }


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.cars();

  }

  cars = () =>{
    var url : any='assets/cars.json'

    this.http.get(url).toPromise().then((res:any)=>{
      if(res.length)
      {
        this.carGridObj.data = res;
      }
    },(err:any)=>{
      console.log(err);
    });
  };
}
