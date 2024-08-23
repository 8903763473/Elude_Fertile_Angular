import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tableStatus: any = [
    {
      id: 1,
      color: '#0AC511',
      name: 'Blank Table'
    },
    {
      id: 2,
      color: '#7B89FF',
      name: 'Running Table'
    },
    {
      id: 3,
      color: '#AF6868',
      name: 'Printed Table'
    },
    {
      id: 4,
      color: '#FF7E20',
      name: 'Paid Table'
    },
    {
      id: 5,
      color: '#8022A1',
      name: 'Running KOT Table'
    }
  ]

  dummy: any = [
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    }
  ]

  constructor() { }

}
