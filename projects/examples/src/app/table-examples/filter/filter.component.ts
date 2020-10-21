import {Component, OnInit, PipeTransform, Type} from '@angular/core';
import {AcTableColumn, AcTableOptions} from 'angular-components';
import {Validators} from '@angular/forms';
import {AcTableConversions} from '../../../../../angular-components/src/lib/ac-table/models/ac-table-conversions';
import {AcCell} from '../../../../../angular-components/src/lib/ac-table/models/ac-cell';
import {HttpClient} from '@angular/common/http';
import {UpperCasePipe} from '@angular/common';
import {GenderCellComponent} from '../edition/gender-cell/gender-cell.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  dataSource;
  columns: AcTableColumn[] =
    [
      {
        key: 'name', label: 'name',
        pipe: {tokenName: 'UpperCasePipe'},
        sticky: 'start',
        filterable: true,
        filterField: {
          type: 'chipsInput',
          name: 'name',
          label: 'Name',
        }
      },
      {key: 'gender', label: 'Gender', componentName: 'GenderCellComponent'},
      {key: 'eye_color', label: 'Eye color'},
      {key: 'hair_color', label: 'Hair color'},
      {key: 'skin_color', label: 'Skin color'},
      {key: 'height', label: 'Height'},
      {key: 'birth_year', label: 'Birthyear'},
      {key: 'image', label: 'Image', sticky: 'end'},
    ];
  options: AcTableOptions = {
    filterOptions: {
      // filterButtonLabel: '<i class="fas fa-filter"></i>',
      mode: 'sidenav',
      sidenavOptions: {
        position: 'end',
        mode: 'side',
        opened: true
      }
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
