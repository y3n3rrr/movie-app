export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
  }
  
  export interface MovieDetails extends Movie {
    Poster: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    imdbRating: string;
  }
  