export interface Character {
  id: number;
  name: string;
  series: string;
}

export interface PageState {
  currentPage: number;
}

export interface CharacterSelectionState {
  characters: number[];
}

export interface CharactersState {
  characters: Character[];
}
