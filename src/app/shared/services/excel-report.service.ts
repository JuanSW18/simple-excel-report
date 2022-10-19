import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { IPokemonReport } from '../adapters/pokemon-report.class';
import { ICustomHeader } from '../interfaces/custom-header.interface';
import { IPokemonInfo } from '../interfaces/pokemon-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {

  constructor() { }

  generateDefaultReport(data: IPokemonInfo[], filename: string) {
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);

    // first way to add a sheet
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    // second way to add a sheet
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
    
    XLSX.writeFileXLSX(workbook, filename, {});
  }

  generateReportWithDict(customHeaders: ICustomHeader[], data: IPokemonInfo[], filename: string) {
    let worksheetData: any[] = [];

    Object(data).forEach( (item: any) => {
      let worksheetItem = Object();
      customHeaders.forEach( header => {
        worksheetItem[header.name] = item[header.key];
      })
      worksheetData.push(worksheetItem)
    })
    
    // excel file
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
    XLSX.writeFileXLSX(workbook, filename, {});
  }

  generateReportWithAdapter(headers: string[], data: IPokemonReport[], filename: string) {
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet([], { header: headers });

    XLSX.utils.sheet_add_json(worksheet, data, { origin: 'A2', skipHeader: true })

    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
    XLSX.writeFileXLSX(workbook, filename);
  }
}
