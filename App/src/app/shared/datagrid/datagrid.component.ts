import { Component, OnInit, Input , DoCheck, KeyValueDiffers,AfterViewInit,ElementRef,ViewChild} from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})

export class DatagridComponent implements OnInit, DoCheck,AfterViewInit {
  @Input('gridobj') gridobj : any;
  @ViewChild("containerRef") containerRef: ElementRef;

  gridData : any = [];
  incVal : any = 20;
  differObj : any = {};
  constructor(private differs : KeyValueDiffers) { }

  ngOnInit(): void {
    this.differObj = this.differs.find(this.gridobj).create();
  }

  ngAfterViewInit(){
    var amountscrolled = ()=>{
          var winheight = this.containerRef.nativeElement.clientHeight;
          var docheight = this.containerRef.nativeElement.scrollHeight;
          var scrollTop = this.containerRef.nativeElement.scrollTop;
          var trackLength = docheight - winheight;
          var pctScrolled = Math.floor(scrollTop/trackLength * 100);
         return pctScrolled;
      }
      this.containerRef.nativeElement.addEventListener('scroll',(event : any)=>{
        var scrollPer = amountscrolled();
        if(scrollPer>90){
          this.buildGrid();
        }
      });
  }

  buildGrid = () => {
    if(this.gridobj.data.length && this.gridData.length < this.gridobj.data.length){
      var k = this.gridData.length;
      for(var i = k; i < (k+this.incVal) && i < this.gridobj.data.length; i++){
          this.gridData.push(this.gridobj.data[i]);
      }
    }
  }

  ngDoCheck() {
    var gridobjChanges = this.differObj.diff(this.gridobj);
    if(gridobjChanges){
      this.buildGrid();
    }
  }

}
