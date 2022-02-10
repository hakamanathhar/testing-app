import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  invoice:String = 'A0001';
  date = new Date();
  id_barcode: String = 'dummy001';
  
  private sub: any;
  constructor(private route: ActivatedRoute) { }

  @ViewChild('containerBarcode') containerBarcode: ElementRef;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.invoice = params['queue'];
      this.id_barcode = params['id_barcode'];
   });
  }

  ngAfterViewInit(){
    this.exportPDF()
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
