import { IPokemonInfo } from "../interfaces/pokemon-response.interface";

export interface IPokemonReport {
  pokemonId: number;
  pokemonName: string;
  pokemonUrlInfo: string;
}


export class PokemonReportAdapter {
  data: IPokemonReport[] = [];

  constructor(pokemonList: IPokemonInfo[]) {
    pokemonList.forEach( (pokemon, index) => {
      const reportItem: IPokemonReport = {
        pokemonId: index + 1,
        pokemonName: pokemon.name,
        pokemonUrlInfo: pokemon.url
      }
      this.data.push(reportItem);
    })
  }
}