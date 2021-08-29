export class Movie {
  idMovie: number = 0;
  movieName: string = '';
  releaseYear: number = 0;
  runtime: number = 0;
  genres: string = '';
  actors: string = '';
  directors: string = '';
  poster: string = '';
  ratings: number = 0;
  voteCount: number = 0;
  overview: string = '';
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  BoxOffice: string;
}
