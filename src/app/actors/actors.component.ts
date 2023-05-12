import { Component ,OnInit} from '@angular/core';
import { TrendingService } from '../trending.service';


@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  constructor(private _TrendingService:TrendingService){}
  trendingPeople:any[]=[];
  mediaType:string='person'
  ngOnInit(): void {
    this._TrendingService.getActor().subscribe({
      next:(data)=>{
        this.trendingPeople=data.results.slice(0,18)
        
      }
    })
  }

}
