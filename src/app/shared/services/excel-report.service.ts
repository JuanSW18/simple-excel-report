import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {

  constructor() { }

  generateDefaultReport(data: any, filename: string) {
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);

    // first way to add a sheet
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    // second way to add a sheet
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
    
    XLSX.writeFileXLSX(workbook, filename, {});
  }

  generateReportWithDict(customHeaders: any[], data: any, filename: string) {
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
}
