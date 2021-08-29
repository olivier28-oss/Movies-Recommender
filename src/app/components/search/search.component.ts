import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieDetail } from 'src/app/models/movie';
import { keys } from 'src/app/my-keys';
import { map } from 'rxjs/operators';
import { MovieServiceService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // @Input() movie: Movie | undefined;

  movieUrlAPI = 'https://api.themoviedb.org/3/search/movie?api_key=';
  url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + `${keys.movieDB}`+ '&sort_by=popularity.desc';
  searchMovies: Array<Movie> = []
  listPoster = [];
  query: string='';
  arrayMovies = [];

  constructor(private http: HttpClient, private movieService: MovieServiceService) { }

  ngOnInit(): void {
  }

  searchMovie(searchQuery: string) {
    this.movieService.fetchMovie(searchQuery).subscribe((data:any)=>{
        console.log(data.results)
        this.arrayMovies = data.results;
      });
  }

getMoviePoster(){
  this.movieService.fetchMoviePoster().subscribe( (data:any)=>{
    console.log(data)
    this.listPoster = data.results;
  })
}








}
