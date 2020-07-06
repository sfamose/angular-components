import {Component, OnInit} from '@angular/core';
import {AcTableColumn} from 'angular-components';
import {UpperCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent implements OnInit {
  dataSource;
  columns: AcTableColumn[] =
    [
      {key: 'name', label: 'name', pipe: {token: UpperCasePipe}, sticky: 'start'},
      {key: 'gender', label: 'Gender'},
      {key: 'eye_color', label: 'Eye color', visibleIfMinWidth: 700},
      {key: 'hair_color', label: 'Hair color', visibleIfMinWidth: 700},
      {key: 'skin_color', label: 'Skin color', visibleIfMinWidth: 700},
      {key: 'height', label: 'Height', visibleIfMinWidth: 700},
      {key: 'birth_year', label: 'Birthyear', visibleIfMinWidth: 700},
      {key: 'image', label: 'Image'}
    ];

  constructor(private http: HttpClient) {
    this.http.get('assets/people.json').subscribe((items: any[]) => {
      items.forEach(x => {
        x.image = '<img height="100" src="assets/images/person_' + x.id + '.png"/>';
      });
      this.dataSource = items;
    });
  }

  ngOnInit(): void {
  }

}
