import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Replace with your actual movie database or API call
  // using TMDB API:
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
  );
  const data = await response.json();

  return NextResponse.json(data.results);
}