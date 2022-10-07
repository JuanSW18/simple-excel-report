export interface IPokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemonInfo[]
}

export interface IPokemonInfo {
  name: string;
  url: string;
}
