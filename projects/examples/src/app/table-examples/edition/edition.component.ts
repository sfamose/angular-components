import {Component, OnInit, PipeTransform, Type} from '@angular/core';
import {AcTableColumn, AcTableOptions} from 'angular-components';
import {UpperCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Validators} from '@angular/forms';
import {GenderCellComponent} from './gender-cell/gender-cell.component';
import {AcTableConversions} from '../../../../../angular-components/src/lib/ac-table/models/ac-table-conversions';
import {AcCell} from '../../../../../angular-components/src/lib/ac-table/models/ac-cell';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {
  dataSource;
  columns: AcTableColumn[] =
    [
      {
        key: 'name', label: 'name',
        pipe: {tokenName: 'UpperCasePipe'},
        sticky: 'start',
        exportable: true,
        field: {
          type: 'input',
          name: 'name',
          label: 'name',
          required: true,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'The name is required'
            }
          ]
        }
      },
      {key: 'gender', label: 'Gender', componentName: 'GenderCellComponent'},
      {key: 'eye_color', label: 'Eye color', exportable: true},
      {key: 'hair_color', label: 'Hair color', exportable: true},
      {key: 'skin_color', label: 'Skin color'},
      {key: 'height', label: 'Height'},
      {key: 'birth_year', label: 'Birthyear'},
      {key: 'image', label: 'Image', sticky: 'end'},
    ];
  options: AcTableOptions = {
    /*addRow: {
      modalTitleLabel: 'Add a row',
      cancelButtonLabel: 'Cancel',
      submitButtonLabel: 'Submit',
      addButtonLabel: 'Add a row'
    },
    editRow: {
      modalTitleLabel: 'Edit a row',
      cancelButtonLabel: 'Cancel',
      submitButtonLabel: 'Submit',
      editButtonLabel: '<i class="fas fa-pencil-alt"></i>'
    },
    deleteRow: {
      confirmation: true,
      confirmationMessage: 'Delete the row ?',
      cancelButtonLabel: 'Cancel',
      submitButtonLabel: 'Submit',
      deleteButtonLabel: '<i class="fas fa-trash-alt"></i>'
    },*/
    exportCSV: {
      fileName: 'test.csv'
    }
  };
  conversionMap: AcTableConversions = {
    pipes: new Map<string, Type<PipeTransform>>(),
    components: new Map<string, Type<AcCell>>(),
    buttonActions: new Map<string, (element: any, column?: AcTableColumn) => void>()
  };


  constructor(private http: HttpClient) {
    this.http.get('assets/people.json').subscribe((items: any[]) => {
      items.forEach(x => {
        x.image = '<img height="100" src="assets/images/person_' + x.id + '.png"/>';
      });
      this.dataSource = items;
    });
  }

  ngOnInit(): void {
    this.conversionMap.pipes.set('UpperCasePipe', UpperCasePipe);
    this.conversionMap.components.set('GenderCellComponent', GenderCellComponent);
  }

}
