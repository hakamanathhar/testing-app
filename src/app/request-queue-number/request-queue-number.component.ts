import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {
  invoice:String = 'A0001';
  date = new Date();
  id_barcode: String = 'dummy001'
  constructor(private svc:GlobalService) { }

  @ViewChild('containerBarcode') containerBarcode: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.svc.lastQueue().subscribe((resp) => {
      this.invoice = resp.data.queue
      this.id_barcode = resp.data.id_barcode
      setTimeout(() => {
        this.exportPDF()
      });
  })
  }

  exportPDF(){
    let barcode = this.containerBarcode.nativeElement
    const pdf = new jsPDF('p', 'mm', [80,100]);
    html2canvas(barcode, { scale: 1}).then((canvas)=>{
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 80, 100);
      pdf.save("doc.pdf");
    })
  }

  

}
