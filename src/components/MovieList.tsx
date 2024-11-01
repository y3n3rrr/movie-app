import React, { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { Link } from 'react-router-dom';

import { Box, Table, TextField, Button,  Typography, TableRow, TableHead, TableCell, TableBody } from '@mui/material';

const MovieList: React.FC = () => {
  const [search, setSearch] = useState('Star Wars');
  const [page, setPage] = useState(1);
  const { movies, isLoading, error } = useMovies(search, page);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <TextField
          label="Search Movies"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={() => setPage(1)}>
          Search
        </Button>
      </Box>

{!isLoading ? <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>IMDb ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.imdbID}>
              <TableCell>
                <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
              </TableCell>
              <TableCell>{movie.Year}</TableCell>
              <TableCell>{movie.imdbID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage(page + 1)} sx={{ marginLeft: 2 }}>
          Next
        </Button>
      </Box>
      </> : <Typography>Loading movies...</Typography>}
    </Box>
  );
};

export default MovieList;
