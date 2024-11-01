import { useEffect, useState, useCallback } from 'react';
import { fetchMovies, fetchMovieDetails } from '../utils/api';
import { Movie, MovieDetails } from '../types';
import useDebouncedEffect from './useDebouncedEffect';
import { debounceDelay } from '../utils/constants';

export const useMovies = (search: string, page: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let searchKey = useDebouncedEffect(search, debounceDelay)
  
  const fetchMoviesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchMovies(searchKey, page);
      setMovies(data.Search || []);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  }, [searchKey, page]);

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  return { movies, isLoading, error };
};

export const useMovieDetails = (imdbID: string) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieDetails(imdbID);
        setMovie(data);
      } catch (error) {
        setError('Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [imdbID]);

  return { movie, isLoading, error };
};
