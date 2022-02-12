import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  isLoading = false;
  totalRows = 10;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions = [2, 10, 20]

  totalRowsQueue = 10;
  pageSizeQueue = 2;
  currentPageQueue = 0;
  pageSizeOptionsQueue = [2, 10, 20]
  
  displayedColumns: string[] = [
    '_id',
    'medical_record',
    'customer_name',
    'pic',
    'region.name',
    'province.name',
    'city.name',
    'remark',
    'actions'
  ];
  
  displayedColumnsQueue: string[] = [
    '_id',
    'customer_name',
    'queue',
    'medical_record',
    'actions'
  ];


  open: Boolean = true;
  dataSource = new MatTableDataSource<any>();
  dataSourceQueue = new MatTableDataSource<any>();

  constructor(
    private svc:GlobalService, 
    private router: Router,
    private fb:FormBuilder
    ) { }

    searchForm = this.fb.group({
      cust_name: [''],
      medical_record: ['']
    });


  ngOnInit(): void {
    this.getVisitorList()
    this.getVisitorListQueue()

  }

  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('paginatorQueue')
  paginatorQueue!: MatPaginator;

  setOpen(value){
    this.open = value
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceQueue.paginator = this.paginatorQueue;
  }

  getVisitorList(){
    this.svc.listVisitor(this.pageSize, this.currentPage).subscribe((resp) => {
        this.dataSource.data = resp.data
        this.totalRows = resp.total
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = resp.total;
        });
    })
  }

  getVisitorListQueue(){
    this.svc.getQueueVisitor(this.pageSizeQueue, this.currentPageQueue).subscribe((resp) => {
        this.dataSourceQueue.data = resp.data
        this.totalRowsQueue = resp.total
        setTimeout(() => {
          this.paginatorQueue.pageIndex = this.currentPage;
          this.paginatorQueue.length = resp.total;
        });
    })
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getVisitorList();
  }

  pageChangedQueue(event: PageEvent) {
    this.pageSizeQueue = event.pageSize;
    this.currentPageQueue = event.pageIndex;
    this.getVisitorListQueue();
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  openDialog(id){
    const confirms = confirm('Anda yakin ingin memasukkan antrian visitor ini?')
    if(confirms){
      this.svc.addQueueVisitor(id).subscribe((resp) => {
          alert(resp.message)
          setTimeout(() => {
            this.router.navigate([]).then((result) => {
              window.open(`/queue/${resp.data.queue}/${resp.data.id_barcode}`, '_blank');
            });
          });
      })
    }
  }

  openDialogQueuePrint(idBarcode){
    const confirms = confirm('Anda yakin ingin mencetak antrian visitor ini?')
    if(confirms){
      this.svc.detailQueueVisitor(idBarcode).subscribe((resp) => {
          setTimeout(() => {
            this.router.navigate([]).then((result) => {
              const data = resp.data[0]
              window.open(`/queue/${data.queue}/${data.id_barcode}`, '_blank');
            });
          });
      })
    }
  }

  onSearch(){
    const payload = {
      pageSize: this.pageSize, 
      currentPage: this.currentPage,
      ...this.searchForm.value
    }
    this.svc.searchVisitor(payload).subscribe((resp) => {
      this.dataSource.data = resp.data
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = resp.total;
      });
  })
  }

  onEdit(id){
    this.router.navigate([]).then((result) => {
      window.open(`/input-visitor-details/${id}`, '_blank');
    });
  }

}
