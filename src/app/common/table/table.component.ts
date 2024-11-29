import { AfterViewInit, Component, computed, effect, input, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  rows = input.required<unknown[]>();
  // compute dataSource for change in input rows 
  dataSource = computed(() => new MatTableDataSource<unknown, MatPaginator>(this.rows()));

  

  cols = input.required<Map<string, string>>();
  // compute colKeys,colNames for change in input rows 
  colKeys = computed(() => Array.from(this.cols().keys()));
  colNames = computed(() => Array.from(this.cols().values()));


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    // An effect is an operation that runs whenever one or more signal values change
    // assigns paginator to the new dataSource
    effect(() => {
      this.dataSource().paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    // link the paginator with the dataSource.
    this.dataSource().paginator = this.paginator;
  }

}

