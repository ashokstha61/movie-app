export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
    Genre?: string;
    Director?: string;
    Actors?: string;
    Plot?: string;
  }
  
  export interface OMDbSearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error?: string;
  }
  