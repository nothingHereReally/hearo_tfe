import { Component } from '@angular/core';


import { TableHospitalHead } from '../../model/table-hospital-head';
import { TableNewSign } from '../../model/table-new-sign';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected contents: Array< TableHospitalHead >= [
    {
      name: 'Liza Mae Villanueva',
      hospital: 'Cebu City Medical Center',
      datetime: 'July 4, 2025 8:50am',
      linkreview: 'https://example.com/'
    },
    {
      name: 'Jessica Bautista',
      hospital: 'Camp Lapu-Lapu Station Hospital',
      datetime: 'July 6, 2025 8:30am',
      linkreview: 'https://example.com/'
    },
    {
      name: 'Maria Clara Santos',
      hospital: 'Adventist Hospital - Cebu, Inc.',
      datetime: 'July 9, 2025 9:55am',
      linkreview: 'https://example.com/'
    },
    {
      name: 'Lisa Garcia',
      hospital: 'Barili District Hospital',
      datetime: 'July 10, 2025 9:10am',
      linkreview: 'https://example.com/'
    },
    {
      name: 'Anna Cruz',
      hospital: 'Cebu South Medical Center',
      datetime: 'July 11, 2025 9:50am',
      linkreview: 'https://example.com/'
    }
  ]
  protected contentNewSign: Array< TableNewSign >= [
    {
      username: 'Liza Mae Villanueva',
      hospital: 'Cebu City Medical Center',
      status: 0,
      linkreview: 'https://example.com/'
    },
    {
      username: 'Jessica Bautista',
      hospital: 'Camp Lapu-Lapu Station Hospital',
      status: 0,
      linkreview: 'https://example.com/'
    },
    {
      username: 'Maria Clara Santos',
      hospital: 'Adventist Hospital - Cebu, Inc.',
      status: 2,
      linkreview: 'https://example.com/'
    },
    {
      username: 'Lisa Garcia',
      hospital: 'Barili District Hospital',
      status: 1,
      linkreview: 'https://example.com/'
    },
    {
      username: 'Anna Cruz',
      hospital: 'Cebu South Medical Center',
      status: 2,
      linkreview: 'https://example.com/'
    }
  ]
}
