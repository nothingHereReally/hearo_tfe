import { Component } from '@angular/core';


import { TableHospitalHead } from '../../model/table-hospital-head';

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
      linkreview: '/login'
    },
    {
      name: 'Jessica Bautista',
      hospital: 'Camp Lapu-Lapu Station Hospital',
      datetime: 'July 6, 2025 8:30am',
      linkreview: '/login'
    },
    {
      name: 'Maria Clara Santos',
      hospital: 'Adventist Hospital - Cebu, Inc.',
      datetime: 'July 9, 2025 9:55am',
      linkreview: '/login'
    },
    {
      name: 'Lisa Garcia',
      hospital: 'Barili District Hospital',
      datetime: 'July 10, 2025 9:10am',
      linkreview: '/login'
    },
    {
      name: 'Anna Cruz',
      hospital: 'Cebu South Medical Center',
      datetime: 'July 11, 2025 9:50am',
      linkreview: '/login'
    }
  ]
}
