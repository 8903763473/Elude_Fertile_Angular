import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  leftSide: boolean = false;
  topHeader: boolean = false;
  
  menuItems = [
    { id: 1, src: '../assets/menu/Home.svg', alt: 'Home' },
    { id: 2, src: '../assets/menu/Discount.svg', alt: 'Discount' },
    { id: 3, src: '../assets/menu/Graph.svg', alt: 'Graph' },
    { id: 4, src: '../assets/menu/Message.svg', alt: 'Message' },
    { id: 5, src: '../assets/menu/Notification.svg', alt: 'Notification' },
    { id: 6, src: '../assets/menu/Setting.svg', alt: 'Setting' },
    { id: 7, src: '../assets/menu/Logout.svg', alt: 'Logout' }
  ];

  constructor(public menu: MenuController) {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  ngAfterViewInit() {
    AOS.refresh();
  }

  selectedMenu(data: any, id: any) {
    this.menu.close()
  }

  menus() {
    console.log('Clicked Menu');
  }


}
