import { Component ,OnInit} from '@angular/core';
import { TrendingService } from '../trending.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  constructor(private _TrendingService:TrendingService){}
trendingTv:any[]=[];
mediaType:string='tv';
ngOnInit(): void {
  this._TrendingService.getTv().subscribe({

    next:(data)=>{
      console.log(data);
      this.trendingTv=data.results.slice(0,18)
    }
  })
}

}
