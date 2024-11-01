import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovies';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id)
  const { movie, isLoading, error } = useMovieDetails(id || '');

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Typography>No movie found</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
          sx={{ width: 300, height: 450, objectFit: 'cover' }}
        />
        <CardContent sx={{ ml: 4 }}>
          <Typography variant="h4" gutterBottom>
            {movie.Title}
          </Typography>
          <Typography variant="body1">Director: {movie.Director}</Typography>
          <Typography variant="body1">Actors: {movie.Actors}</Typography>
          <Typography variant="body1">Genre: {movie.Genre}</Typography>
          <Typography variant="body1">IMDb Rating: {movie.imdbRating}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {movie.Plot}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetails;
