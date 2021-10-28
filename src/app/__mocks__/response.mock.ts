import { CharacterList } from "./characterList.mock";

export const Response = {
  info: {
    count: 671,
    pages: 34,
    next: 'https://rickandmortyapi.com/api/character/?page=2',
    prev: null,
  },
  results: CharacterList,
};