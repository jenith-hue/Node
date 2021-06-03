import { Component, OnInit, Input ,Output, DoCheck, KeyValueDiffers,AfterViewInit, EventEmitter} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit, DoCheck,AfterViewInit {

  @Input('gridobj') gridobj : any;
  @Output() linkClick : any = new EventEmitter();
  gridData : any = [];
  incVal : any = 20;
  differObj : any = {};

  constructor(private differs : KeyValueDiffers) { }

  ngOnInit(): void {
    this.differObj = this.differs.find(this.gridobj).create();

  }

  gridLinkClick = (row:any,column : any) =>{
    var obj = {
      row : row,
      column : column
    };
    this.linkClick.emit(obj);
  }

  ngAfterViewInit(){
    var amountscrolled = ()=>{
          var winheight = $('#data-grid-container').height();
          var docheight = document.getElementById('data-grid-container').scrollHeight;
          var scrollTop = $('#data-grid-container').scrollTop()
          var trackLength = docheight - winheight
          var pctScrolled = Math.floor(scrollTop/trackLength * 100);
         return pctScrolled;
      }
    document.getElementById('data-grid-container').addEventListener('scroll',(event : any)=>{
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
      this.gridData = [];
      this.buildGrid();
    }
  }

}
