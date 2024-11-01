import axios from 'axios';

export const fetchMovies = async (search: string, page: number) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
    params: {
      apiKey: process.env.REACT_APP_API_KEY,
      s: search,
      page,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (id: string) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
    params: {
      apiKey: process.env.REACT_APP_API_KEY,
      i: id,
    },
  });
  return response.data;
};
