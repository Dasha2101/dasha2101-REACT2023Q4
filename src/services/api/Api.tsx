import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchDataResponse, SearchDataType } from '../types/index';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchAllResults: builder.query<SearchDataResponse, number>({
      query: (page = 1) => `?page=${page}`,
    }),
    fetchSearchResults: builder.query<
      SearchDataResponse,
      { query: string; page: number }
    >({
      query: ({ query, page = 1 }) => `?name=${query.trim()}&page=${page}`,
    }),
    fetchCharacter: builder.query<SearchDataType, number>({
      query: (id) => `${id}`,
    }),
  }),
});

export const {
  useFetchAllResultsQuery,
  useFetchSearchResultsQuery,
  useFetchCharacterQuery,
} = rickAndMortyApi;
