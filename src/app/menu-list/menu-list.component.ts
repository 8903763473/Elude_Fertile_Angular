import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Platform } from '@ionic/angular';

declare var window: any;
declare var cordova: any;

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

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

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

  constructor(public router: Router, public app: AppComponent, private platform: Platform) { }

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

  downloadPDF() {
    const pdf = new jsPDF();
    const img = new Image();
    img.src = 'assets/menu/ELUDE.png';
    img.onload = () => {
      const imgWidth = 40;
      const imgHeight = (img.height * imgWidth) / img.width;
      pdf.addImage(img, 'PNG', 85, 10, imgWidth, imgHeight);
      pdf.setFontSize(12);
      pdf.text('D20A, "C" colony,', 105, 40, { align: 'center' });
      pdf.text('Perumalpuram, Tirunelveli.', 105, 45, { align: 'center' });
      pdf.text('Pin: 627007', 105, 50, { align: 'center' });
      pdf.setLineDashPattern([1, 1], 0);
      pdf.line(15, 55, 195, 55);
      pdf.setLineDashPattern([], 0);
      pdf.setFontSize(14);
      pdf.text('Customer Details', 15, 60);
      pdf.setFontSize(12);
      pdf.text('Name  :  Ranisha Michsel', 15, 70);
      pdf.text('Phone no  :  89407398830', 15, 75);
      pdf.setLineDashPattern([1, 1], 0);
      pdf.line(15, 80, 195, 80);
      pdf.setLineDashPattern([], 0);
      pdf.setFontSize(12);
      pdf.text('Dine In - Table No: 11', 105, 87, { align: 'center' });
      pdf.setLineWidth(0.5);
      pdf.line(15, 90, 195, 90);
      pdf.line(15, 100, 195, 100);
      pdf.text('S.No', 29, 97, { align: 'center' });
      pdf.text('No of Items', 67, 97, { align: 'center' });
      pdf.text('Quantity', 105, 97, { align: 'center' });
      pdf.text('Price', 170, 97, { align: 'center' });

      const items = [
        { sno: '1', item: 'Mutton Briyani', quantity: '1', price: '150' },
        { sno: '2', item: 'Chicken Briyani', quantity: '1', price: '140' },
        { sno: '3', item: 'Veg Briyani', quantity: '1', price: '120' },
        { sno: '4', item: 'Fish Curry', quantity: '1', price: '100' }
      ];

      let startY = 105;
      items.forEach((item, index) => {
        pdf.text(item.sno, 29, startY + (index * 10), { align: 'center' });
        pdf.text(item.item, 67, startY + (index * 10), { align: 'center' });
        pdf.text(item.quantity, 105, startY + (index * 10), { align: 'center' });
        pdf.text(item.price, 170, startY + (index * 10), { align: 'center' });

        pdf.line(15, startY - 5 + (index * 10), 195, startY - 5 + (index * 10));
      });

      pdf.line(15, 90, 15, startY + (items.length - 1) * 10 + 5);
      pdf.line(45, 90, 45, startY + (items.length - 1) * 10 + 5);
      pdf.line(90, 90, 90, startY + (items.length - 1) * 10 + 5);
      pdf.line(120, 90, 120, startY + (items.length - 1) * 10 + 5);
      pdf.line(195, 90, 195, startY + (items.length - 1) * 10 + 5);

      pdf.line(15, startY + (items.length * 10) - 5, 195, startY + (items.length * 10) - 5);

      pdf.text('Total Qty : 4 Sub Total: 600.00', 140, startY + (items.length * 10) + 10);
      pdf.text('Customer Discount : 10.75', 140, startY + (items.length * 10) + 20);
      pdf.text('SGST 2.5% : 5.11', 140, startY + (items.length * 10) + 30);
      pdf.text('CGST 2.5% : 5.11', 140, startY + (items.length * 10) + 40);

      pdf.setFontSize(14);
      pdf.text('Total Amount : 1500.00', 140, startY + (items.length * 10) + 50);

      pdf.setFontSize(12);
      pdf.text('************************************************** Thank You *************************************************', 105, startY + (items.length * 10) + 65, { align: 'center' });

      pdf.save('receipt.pdf');
    }
  }


  // downloadPDF() {
  //   html2canvas(this.pdfContent.nativeElement).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();

  //     // Adjust PDF dimensions based on image dimensions
  //     const imgWidth = 210; // A4 size in mm
  //     const pageHeight = 295; // A4 size in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     if (this.platform.is('cordova')) {
  //       // Save on mobile (Android/iOS) using Cordova File plugin
  //       const pdfOutput = pdf.output('blob');
  //       this.savePDFOnCordova(pdfOutput);
  //     } else {
  //       // Download on Web
  //       pdf.save('receipt.pdf');
  //     }
  //   });
  // }

  savePDFOnCordova(pdfBlob: Blob) {
    this.platform.ready().then(() => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(pdfBlob);
      reader.onloadend = () => {
        const buffer = reader.result as ArrayBuffer;
        const data = new Uint8Array(buffer);
        const pdfArray = Array.from(data);

        // Use Cordova File plugin to save the PDF
        const fileName = 'receipt.pdf';
        const filePath = cordova.file.externalDataDirectory || cordova.file.documentsDirectory;

        window.resolveLocalFileSystemURL(filePath, (dir: any) => {
          dir.getFile(fileName, { create: true }, (file: any) => {
            file.createWriter((fileWriter: any) => {
              fileWriter.onwriteend = () => {
                alert('PDF saved successfully on your device!');
              };
              fileWriter.onerror = (e: any) => {
                alert('Failed to save PDF: ' + e.toString());
              };
              fileWriter.write(new Blob([new Uint8Array(pdfArray)], { type: 'application/pdf' }));
            });
          });
        });
      };
    });
  }

}
