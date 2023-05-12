import { Component ,OnInit} from '@angular/core';
import { TrendingService } from '../trending.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent  implements OnInit{
  constructor(private _TrendingService:TrendingService){}
  trendingMovies:any[]=[];
  mediaType:string='movie'
  ngOnInit(): void {
    this._TrendingService.getMovies().subscribe({
      next:(data)=>{
        console.log(data);
       this.trendingMovies=data.results.slice(0,18)
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

}
