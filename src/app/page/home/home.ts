import { Component } from '@angular/core';


import { DataTableTitle } from '../../model/data-table-title';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected tableName: string= 'Hospital Head Request';
  protected titles: Array<DataTableTitle>= [
    {'name': 'Name', isLink: false},
    {'name': 'Hospital', isLink: false},
    {'name': 'Date and Time', isLink: false},
    {'name': 'Review', isLink: false}
  ]
  protected contents: Array< Array<string> >= [
    ['Liza Mae Villanueva', 'Cebu City Medical Center', 'July 4, 2025 8:50am', 'https://example.com/'],
    ['Jessica Bautista', 'Camp Lapu-Lapu Station Hospital', 'July 6, 2025 8:30am', 'https://example.com/'],
    ['Maria Clara Santos', 'Adventist Hospital - Cebu, Inc.', 'July 9, 2025 9:55am', 'https://example.com/'],
    ['Lisa Garcia', 'Barili District Hospital', 'July 10, 2025 9:10am', 'https://example.com/'],
    ['Anna Cruz', 'Cebu South Medical Center', 'July 11, 2025 9:50am', 'https://example.com/']
  ]
}
