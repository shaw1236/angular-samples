import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

enum Status {
  active = 'A',
  inactive = 'I',
  initial = '',
  rejected = 'R'
}

export interface PeriodicElement {
  name: string;
  position: number;
  status: Status; 
  weight: number;
  symbol: string;
  build?: string;
  biosId?: string | null;
}

 @Component({
  selector: 'app-simple-table-example',
  templateUrl: './simple-table-example.component.html',
  styleUrls: ['./simple-table-example.component.scss']
})
export class SimpleTableExampleComponent implements OnInit, AfterViewInit {
  //@ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns: string[] = ['position', 'name', 'status', 'weight', 'symbol', 'build'];
  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', status: Status.active, weight: 1.0079, symbol: 'H', build: '1.21', biosId: "1234/teftwerwe/geywgruw/rysssssssssssssssuw" },
    {position: 2, name: 'Helium', status: Status.active, weight: 4.0026, symbol: 'He', build: '1.8', biosId: null },
    {position: 3, name: 'Lithium', status: Status.inactive, weight: 6.941, symbol: 'Li', build: '1.31', biosId: "1236/bgvshfgdsj/jnfskjhf/fdsbssssssssdhfs" },
    {position: 4, name: 'Beryllium', status: Status.initial, weight: 9.0122, symbol: 'Be', build: '1.13', biosId: "1237/gfdsW/gfdskjfgdskj" },
    {position: 5, name: 'Boron', status: Status.active, weight: 10.811, symbol: 'B', build: '1.1', biosId: "1238/gfesdhjdf/dsasfdas" },
    {position: 6, name: 'Carbon', status: Status.active, weight: 12.0107, symbol: 'C', build: '1.9', biosId: "1239/fbdshjfscs/ddsdss" },
    {position: 7, name: 'Nitrogen', status: Status.inactive, weight: 14.0067, symbol: 'N', build: '1.10', biosId: "1240/gfdshfgssswsj/vhjsgfjes" },
    {position: 8, name: 'Oxygen', status: Status.initial, weight: 15.9994, symbol: 'O', biosId: "1241/hgsfd/fdgsfs/Ws" },
    {position: 9, name: 'Fluorine', status: Status.active, weight: 18.9984, symbol: 'F', build: '1.2', biosId: "1242/gfdshfttttttttttttttttdasfdga" },
    {position: 10, name: 'Neon', status: Status.inactive, weight: 20.1797, symbol: 'Ne', build: '1.12', biosId: "1234/gfsdhjfdsfsfhdsfg/fesdgfhsdf" },
  ];
  
  dataSource: any = null;

  filterValue: string = '';  // filter variable
  filterControl: FormControl; // form control filter binding

  now: number = Date.now();
  fruits: string[] = ["Banana", "Apple", "Strawberry", "Mango"];

  constructor() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    //this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    this.filterControl = new FormControl('');
  }

  ngOnInit(): void {
    //this.dataSource.data = this.ELEMENT_DATA;
  }

  ngAfterViewInit() { // lifecycle - view initialization is completed
    // Sorting 
    this.dataSource.sort = this.sort;
    
    // sort: "data" is sorted on column "sortHeaderId" 
    // _data(data), _renderData
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
      let result: string | number;
      switch(sortHeaderId) {
        case 'build':
          result = this.getReleaseNumber(data[sortHeaderId]);
          break;
        case 'status':
          const valueTable = { [Status.active]: 0, [Status.inactive]: 1, [Status.initial]: 2, [Status.rejected]: 3 };
          result = valueTable[data[sortHeaderId] as Status];
          break; 
        default:  
          result = data[sortHeaderId];
          break;
      }
      return result;
    };

    // filter: pick up if true, otherwise filter out
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const item = data as PeriodicElement;
      const re = new RegExp(`^${filter}.*$`, 'i');
      //const re = new RegExp(`^.*${filter}$`, 'i');
      let result = false;
      for (const k1 in data) {
        result = data[k1] && re.test("" + data[k1]) || false;
        if (result) break;
      }
      return result;
    }

    // Pagination
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Choose Your Page Size";
  }

  // Filter the input
  onFilter(filterValue: string) {
    if (filterValue) 
      filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  onPaginateChange($event: any) {
    //$event: { length: 10, pageIndex: 1, pageSize: 5, previousPageIndex: 0 }
    console.log("Event:", $event);
  }

  clickId(event: any, element: any) {
    //event.preventDefault();
    const col = event.target.attributes.col.value;
    console.log("clicked", col);
    event.stopPropagation();          // stop event retrieving or bubbling onto parent or further elements  
    //event.stopImmediatePropagation(); // stop event retrieving or bubbling onto parents or up and peers
  }

  clickName(event: any) {
    //event.preventDefault();
    const col = event.target.attributes.col?.value;
    console.log("clicked", col);
    //event.stopPropagation();          // stop event retrieving or bubbling onto parent or further elements  
    //event.stopImmediatePropagation(); // stop event retrieving or bubbling onto parents or up and peers
  }

  private getReleaseNumber(ver: string, maxLen = 3): number {
    try {
      if (!ver) return 0; //undefined, null, ""
      const arr = ver.split(".").map(ea => ea.padStart(maxLen, "0"));
      const result: number = Number(arr.join(""));  
      return !isNaN(result)? result : 0;
    }
    catch(ex) {
      //console.log({ ver, message: ex.message || ex});
      return 0;
    }
  }
}
