import { Component, OnInit } from '@angular/core';
import { PokemonReportAdapter } from './shared/adapters/pokemon-report.class';
import { IPokemonInfo } from './shared/interfaces/pokemon-response.interface';
import { ExcelReportService } from './shared/services/excel-report.service';
import { PokemonService } from './shared/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Simple Excel Report';
  pokemonList: IPokemonInfo[] = [];

  constructor(private pokemonService: PokemonService,
    private excelReportService: ExcelReportService) {}

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

  generateReport() {
    // first way
    // this.excelReportService.generateDefaultReport(this.pokemonList, "Reporte-pokemon-default.xlsx");

    // second way: dict for header
    // const headers = [
    //   { key: 'name', name: 'Pokemon' },
    //   { key: 'url', name: 'Info URL' }
    // ]
    // this.excelReportService.generateReportWithDict(headers, this.pokemonList, "Reporte-pokemon-dict.xlsx")

    // third way: use an adapter
    const headers = ['Pokemon ID', 'Pokemon Name', 'Pokemon URL Info'];
    const report = new PokemonReportAdapter(this.pokemonList);
    this.excelReportService.generateReportWithAdapter(headers, report.data, "Reporte-pokemon-adapter.xlsx")
  }
}
