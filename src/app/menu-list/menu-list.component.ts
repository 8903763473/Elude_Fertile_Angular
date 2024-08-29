import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  animations: [
    trigger('slideUp', [
      state('hidden', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('hidden <=> visible', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class MenuListComponent {

  orderedFoods: any = [];

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
  ];

  menuItems = [
    { name: 'All', img: '../../assets/categories/All.svg', description: '12 Items', isActive: true },
    { name: 'Breakfast', img: '../../assets/categories/Breakfast.svg', description: '7 Items', isActive: false },
    { name: 'Soups', img: '../../assets/categories/Soups.svg', description: '5 Items', isActive: false },
    { name: 'Pasta', img: '../../assets/categories/Pasta.svg', description: '8 Items', isActive: false },
    { name: 'Main Course', img: '../../assets/categories/MainCourse.svg', description: '15 Items', isActive: false },
    { name: 'Breakfast', img: '../../assets/categories/Breakfast.svg', description: '7 Items', isActive: false },
    { name: 'Pasta', img: '../../assets/categories/Pasta.svg', description: '8 Items', isActive: false },
    { name: 'Main Course', img: '../../assets/categories/MainCourse.svg', description: '15 Items', isActive: false },
  ];

  selectedTab: any = 1;
  splitBillId: any = 1;
  removeFood: boolean = false;
  validateReason: boolean = false;
  selectedIdtoDelete: any;
  reasonToDeleteFood: any
  applyDiscount: boolean = false;
  ShowSwipeup: boolean = false;
  viewTableOrders: any;
  SideDish: boolean = false;
  specialNotes: boolean = false;
  InTable: boolean = false;

  constructor(public router: Router, public app: AppComponent) { }

  dummyArray: any = [
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

  sideDishData: any = [
    {
      id: 1,
      status: 'added'
    },
    {
      id: 1,
      status: 'not-added'
    },
    {
      id: 1,
      status: 'not-added'
    },
    {
      id: 1,
      status: 'not-added'
    },
    {
      id: 1,
      status: 'not-added'
    },
    {
      id: 1,
      status: 'not-added'
    }
  ]

  ngOnInit() {
    this.app.leftSide = true;
    this.app.topHeader = true;
    this.specialNotes = false
    this.SideDish = false;
    this.selectedIdtoDelete = undefined
    this.selectedTab = 1;
    this.splitBillId = 0;
    this.removeFood = false;
    this.ShowSwipeup = false;
    this.applyDiscount = false;
    this.orderedFoods = [];
    this.viewTableOrders = this.router.url.split('/')[2] != undefined ? true : false;
    this.orderedFoods = this.viewTableOrders ? this.dummyArray : [];
  }

  tabClick(id: any) {
    this.selectedTab = id
  }

  choosenSplitBill(id: any) {
    this.splitBillId = id
  }

  AddFood(id: any) {
    const index = this.orderedFoods.findIndex((res: any) => res.id === id);
    if (index === -1) {
      this.orderedFoods.push({ id });
    } else {
      this.orderedFoods.splice(index, 1);
    }
    this.SideDish = false
  }

  RemoveFoodAlert(id: any) {
    this.removeFood = true
    this.selectedIdtoDelete = id
  }

  confirmDelete() {
    if (this.reasonToDeleteFood) {
      if (!this.viewTableOrders) {
        this.orderedFoods = this.orderedFoods.filter((food: any) => food.id !== this.selectedIdtoDelete);
        this.removeFood = false;
        this.validateReason = false;
        this.reasonToDeleteFood = undefined
      } else {
        this.removeFood = false;
        this.validateReason = false;
        this.reasonToDeleteFood = undefined
      }
    } else {
      this.validateReason = true;
    }
  }

  cancelDelete() {
    this.selectedIdtoDelete = undefined
    this.removeFood = false
  }

  swipeUp(id: any) {
    const bool: any = id == 1 ? false : true;
    this.ShowSwipeup = bool;
  }

  doPayment(data: any) {
    this.router.navigate(['home/' + data])
  }

  onDoubleTap() {
    this.SideDish = true;
  }

}
