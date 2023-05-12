import { Component,OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-deatails',
  templateUrl: './deatails.component.html',
  styleUrls: ['./deatails.component.css']
})
export class DeatailsComponent implements OnInit{
  constructor(private _TrendingService:TrendingService, private _ActivatedRoute:ActivatedRoute){}
  item:any;

  ngOnInit(): void {
    let {id , mediaType}=this._ActivatedRoute.snapshot.params;
    this._TrendingService.getTrendingDetails(id,mediaType).subscribe({
      next:(data)=>{
        console.log(data)
        this.item= data;
      }
    })
    
  }

}
