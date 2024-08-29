import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

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

  settle: boolean = false;
  orderStatus: boolean = false;
  filter: boolean = false;
  selectedPaymentMethod: any
  payMethod: any
  constructor(public router: Router, public app: AppComponent) { }

  ngOnInit() {
    this.app.leftSide = true;
    this.app.topHeader = true;
    this.payMethod = this.router.url.split('/')[2]
    this.settle = false;
    if (this.payMethod != undefined) {
      this.settle = true
    }
    this.selectedPaymentMethod = this.payMethod == undefined ? 'Select' : this.payMethod
  }

  SaveTable() {
    this.settle = true;
  }

  viewTable() {
    this.router.navigate(['/menuList/viewTable'])
  }

  MeniList() {
    this.router.navigate(['/menuList'])
  }

  onPaymentMethodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedPaymentMethod = target.value;
    console.log('Selected payment method:', this.selectedPaymentMethod);
  }

}
