export type SearchDataType = {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  type: string;
};

export type InfoType = {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
};

export type SearchDataResponse = {
  info: InfoType;
  results: SearchDataType[];
};
