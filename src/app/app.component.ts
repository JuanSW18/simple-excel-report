import { Component, OnInit } from '@angular/core';
import { IPokemonInfo } from './shared/interfaces/pokemon-response.interface';
import { PokemonService } from './shared/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Simple Excel Report';
  pokemonList: IPokemonInfo[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonService.getPokemonList(0, 10).subscribe({
      next: (response) => {
        this.pokemonList = [...response.results];
      },
    })
  }
}
