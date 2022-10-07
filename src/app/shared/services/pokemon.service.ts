import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemonResponse } from '../interfaces/pokemon-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  readonly API_BASE = 'https://pokeapi.co/api/v2';

  constructor(private network: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<IPokemonResponse> {
    const endpoint = `${this.API_BASE}/pokemon/?offset=${offset}&limit=${limit}`;
    return this.network.get<IPokemonResponse>(endpoint);
  }
}
