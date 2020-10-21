import {Inject, Injectable} from '@angular/core';
import {AcTableOptions} from '../models/ac-table-options';
import {AcTableColumn} from '../models/ac-table-column';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class ExportCsvService {

  constructor(@Inject('moment') private moment) {
  }

  exportCSV(options: AcTableOptions, columns: AcTableColumn[], rows: any[]): void {

    let filename = options.exportCSV.fileName;
    if (options.exportCSV.formatDate) {
      const d = this.moment().format(options.exportCSV.formatDate);
      filename = filename.replace(/\[date\]/, d);
    }

    if (options.exportCSV.externalExport) {
      options.exportCSV.externalExport().pipe(take(1)).subscribe(csvContent => {
        this.download(csvContent, filename, options.exportCSV.mimeType);
      });
    } else {
      this.internalExport(options, filename, columns, rows);
    }
  }

  internalExport(options: AcTableOptions, filename: string, columns: AcTableColumn[], rows: any[]) {
    const data = this.convertData(columns, rows, options.exportCSV.addDoubleQuote);
    const separator = options.exportCSV.separator || ';';
    const csvContent = this.createCsvContent(data, separator);

    this.download(csvContent, filename, 'data:text/csv;charset=utf-8');
  }

  convertData(columns: AcTableColumn[], rows: any[], addDoubleQuote: boolean): string[][] {
    const data: string[][] = [];
    const exportColumns = columns.filter(x => x.exportable);
    data.push(this.getHeaderRow(exportColumns, addDoubleQuote));
    rows.forEach(row => {
      data.push(this.getRow(row, exportColumns, addDoubleQuote));
    });
    return data;
  }

  getHeaderRow(columns: AcTableColumn[], addDoubleQuote: boolean): string[] {
    const d = [];
    columns.forEach(col => {
      let text = col.exportLabel ? col.exportLabel : col.label;
      if (addDoubleQuote) {
        text = '"' + text + '"';
      }
      d.push(text);
    });
    return d;
  }

  getRow(row: any, columns: AcTableColumn[], addDoubleQuote: boolean): string[] {
    const d = [];
    columns.forEach(col => {
      let text = row[col.key] && col.attributeKey ? row[col.key][col.attributeKey] : row[col.key];
      if (addDoubleQuote) {
        text = '"' + text + '"';
      }
      d.push(text);
    });
    return d;
  }

  createCsvContent(data: string[][], separator: string): string {
    let dataString;
    let csvContent = '\uFEFF';
    data.forEach((infoArray, index) => {
      dataString = infoArray.join(separator);
      csvContent += index < data.length ? dataString + '\n' : dataString;
    });
    return csvContent;
  }

  download(content, fileName, mimeType): boolean {
    const a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream;charset=UTF-8';
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([content], {type: mimeType}), fileName);
    } else if ('download' in a) {
      a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      setTimeout(() => {
        a.click();
        document.body.removeChild(a);
      }, 66);
      return true;
    } else {
      const f = document.createElement('iframe');
      document.body.appendChild(f);
      f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);
      setTimeout(() => {
        document.body.removeChild(f);
      }, 333);
      return true;
    }
  }
}
