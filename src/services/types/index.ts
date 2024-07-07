export type SearchDataType = {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
};

export type SearchDataResponse = {
  results: SearchDataType[];
};
