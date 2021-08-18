import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieDetail } from 'src/app/models/movie';
import { keys } from 'src/app/my-keys';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() movie: Movie | undefined;

  movieUrlAPI = 'https://api.themoviedb.org/3/search/movie?api_key=';
  url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + `${keys.movieDB}`+ '&sort_by=popularity.desc';
  searchMovies: Array<Movie> = []
  listPoster = [];
  query: string='';
  movies$: Observable<Array<Movie>> | undefined;
arrayMovies = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  searchMovie(searchQuery: string) {
    this.http.get(`${this.movieUrlAPI}${keys.movieDB}&query=${searchQuery}`)
      .subscribe((data:any)=>{
        console.log(data.results)
        this.arrayMovies = data.results;
      });
  }

  // getSearchResults(){
  //   this.movies$ = this.searchMovie(this.query);
  // }

  // getMovieDetails(imdbId: string): Observable<MovieDetail> {
  //   return this.http.get(`https://www.omdbapi.com/?apikey=${this.API_KEY}&i=${imdbId}&plot=full`);
  // }









  getMovie(movieName:string){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${keys.movieDB}`
    }

    this.http.get<Movie>(`${this.movieUrlAPI}${keys.movieDB}&query=${movieName}`, {headers: headers})
    .subscribe(
      data =>{
        this.searchMovies.push(data);
        console.log(data)},
      error => {console.log(error)});
  }

  saveMovies(movie:any){
    console.log(movie);
    this.getMovie(movie);
  }

getMoviePoster(){
  this.http.get(this.url).subscribe( (data:any)=>{
    console.log(data)
    this.listPoster = data.results;
  })
}








}
