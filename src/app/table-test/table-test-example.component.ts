import { OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, Component, ViewChild, ViewChildren, ContentChild, QueryList } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Table with sorting
 */
@Component({
  selector: 'table-test-example',
  styleUrls: ['./table-test-example.component.scss'],
  templateUrl: './table-test-example.component.html',
})
export class TableTestExampleComponent implements AfterViewInit, OnInit, AfterContentInit, AfterContentChecked {
  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;  // Query DOM and find view element matched Type MatSort
  @ViewChildren(MatSort) sorts!: QueryList<MatSort>;     // Query DOM and find view element list(reference) matched Type MatSort
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginators!: QueryList<MatPaginator>;

  readonly displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  readonly ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Iron', weight: 10.12, symbol: 'Ir'},
  ];
  
  dataSource!: MatTableDataSource<PeriodicElement>;
  filterValue: string = ''; // filter value binding

  constructor() {
    console.log("data source: ", this.dataSource);  // undefined
  }
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const item = data as PeriodicElement;
      const re = new RegExp(`^${filter}.*$`, 'i');
      //const re = new RegExp(`^.*${filter}$`, 'i');
      return re.test(item.name);
    }

    // _data(data), _renderData
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
      return data[sortHeaderId];
    }

    console.log("data source: ", this.dataSource); 
  }

  // Should be no data content changed any more between AfterContentChecked and here
  ngAfterContentInit() {
    //this.dataSource.filter = 'ON';               // filter string
  }

  ngAfterContentChecked() {
    //this.dataSource.filter = 'UM';               // filter string
  }

  ngAfterViewInit() {
    if (this.paginator?._intl) this.paginator._intl.itemsPerPageLabel = "Pick Page Size";

    this.dataSource.sort = this.sort;  // from view 
    //this.dataSource.sort = this.sorts.first;  // from view 

    this.dataSource.paginator = this.paginator;  // from view
    //this.dataSource.paginator = this.paginators.last;  // from view

    if (this.dataSource && this.sort) {
      console.log("data filter: ", this.dataSource.filteredData); 
      console.log("sortData: ", this.dataSource.sortData(this.ELEMENT_DATA, this.sort)); // apply the current sorting
    }
  }

  onPaginateChange($event: any) {
    //$event: { length: 10, pageIndex: 1, pageSize: 5, previousPageIndex: 0 }
    console.log("Event:", $event);
  }

  onCheckRow(row: any) {
    const item = row as PeriodicElement;
    console.log('row: ', item);
    console.log("sortData: ", this.dataSource.sortData(this.ELEMENT_DATA, this.sort));
  }

  // Filter the input
  filter() {
    if (this.filterValue) 
      this.filterValue = this.filterValue.trim();
    this.dataSource.filter = this.filterValue;
  }
}
