import { AfterViewInit, Component, computed, input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  rows = input.required<unknown[]>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // compute dataSource for change in input rows 
  dataSource = computed(() => {
    let ds = new MatTableDataSource<unknown, MatPaginator>(this.rows())
    ds.paginator = this.paginator;
    return ds;
  });

  

  cols = input.required<Map<string, string>>();
  // compute colKeys,colNames for change in input rows 
  colKeys = computed(() => Array.from(this.cols().keys()));
  colNames = computed(() => Array.from(this.cols().values()));


  ngAfterViewInit() {
    // link the paginator with the dataSource.
    this.dataSource().paginator = this.paginator;
  }

}

