import { OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, Component, ViewChild, ViewChildren, ContentChild, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../dialog-test/dialog-animations-example';

export enum Status {
  active = 'A',
  inactive = 'I',
  initial = '',
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

/**
 * @title Table with sorting
 */
@Component({
  selector: 'table-test-example',
  styleUrls: ['./table-test-example.component.scss'],
  templateUrl: './table-test-example.component.html',
  animations: [
    trigger('detailExpand', [ 
      state('collapsed, void', style({ height: '0px' })), 
      state('expanded', style({ height: '*' })), 
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), 
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')) ])    
  ],
})
export class TableTestExampleComponent implements AfterViewInit, OnInit, AfterContentInit, AfterContentChecked {
  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;  // Query DOM and find view element matched Type MatSort
  @ViewChildren(MatSort) sorts!: QueryList<MatSort>;     // Query DOM and find view element list(reference) matched Type MatSort
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginators!: QueryList<MatPaginator>;

  readonly displayedColumns: string[] = ['position', 'name', 'status', 'weight', 'symbol', 'build'];
  readonly ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', status: Status.active, weight: 1.0079, symbol: 'H', build: '1.21', biosId: "1234/teftwerwe/geywgruw/rysssssssssssssssuw" },
    {position: 2, name: 'Helium', status: Status.active, weight: 4.0026, symbol: 'He', build: '1.8', biosId: null },
    {position: 3, name: 'Lithium', status: Status.inactive, weight: 6.941, symbol: 'Li', build: '1.31', biosId: "1236/bgvshfgdsj/jnfskjhf/fdsbssssssssdhfs" },
    {position: 4, name: 'Beryllium', status: Status.initial, weight: 9.0122, symbol: 'Be', build: '1.13', biosId: "1237/gfdsW/gfdskjfgdskj" },
    {position: 5, name: 'Boron', status: Status.active, weight: 10.811, symbol: 'B', build: '1.1', biosId: "1238/gfesdhjdf/dsasfdas" },
    {position: 6, name: 'Carbon', status: Status.active, weight: 12.0107, symbol: 'C', build: '1.9', biosId: "1239/fbdshjfscs/ddsdss" },
    {position: 7, name: 'Nitrogen', status: Status.inactive, weight: 14.0067, symbol: 'N', build: '1.10', biosId: "1240/gfdshfgssswsj/vhjsgfjes" },
    {position: 8, name: 'Oxygen', status: Status.initial, weight: 15.9994, symbol: 'O', build: '1.11', biosId: "1241/hgsfd/fdgsfs/Ws" },
    {position: 9, name: 'Fluorine', status: Status.active, weight: 18.9984, symbol: 'F', build: '1.2', biosId: "1242/gfdshfttttttttttttttttdasfdga" },
    {position: 10, name: 'Neon', status: Status.inactive, weight: 20.1797, symbol: 'Ne', build: '1.12', biosId: "1234/gfsdhjfdsfsfhdsfg/fesdgfhsdf" },
  ];
  
  dataSource!: MatTableDataSource<PeriodicElement>;
  
  filterValue: string = ''; // filter value binding
  filterControl: FormControl; // control filter 

  allRowsNeedDetailExpanded: boolean = true; // All rows need detail expanded

  constructor(private dialog: MatDialog) {
    this.filterControl = new FormControl('');

    console.log("data source: ", this.dataSource);  // undefined
  }
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
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

    // sort: "data" is sorted on column "sortHeaderId" 
    // _data(data), _renderData
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
      let result: string | number;
      switch(sortHeaderId) {
        case 'build':
          result = this.getReleaseNumber(data[sortHeaderId]);
          break;
        case 'status':
          const valueTable = { [Status.active]: 0, [Status.inactive]: 1, [Status.initial]: 2 };
          result = valueTable[data[sortHeaderId] as Status];
          break; 
        default:  
          result = data[sortHeaderId];
          break;
      }
      return result;
    };

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
  onFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  clickId(event: any) {
    const text = "Is &quot;id&quot; column hit?";
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      width: '250px',
      data: {
        text,
        //oneButton: true, 
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }
    });
    const ob1: Observable<boolean> = dialogRef.afterClosed();
    ob1.subscribe((result: boolean) => {
        console.log("result:", result);
    });

    event.stopPropagation();          // stop event retrieving or bubbling onto parent or further elements  
    //event.stopImmediatePropagation(); // stop event retrieving or bubbling onto parents or up and peers
  }

  clickName(event: any) {
    //event.preventDefault();
    const text = "This is name column";
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      width: '250px',
      data: {
        text, oneButton: true
      }
    });
    const ob1: Observable<boolean> = dialogRef.afterClosed();
    ob1.subscribe((result: boolean) => {
        console.log("result:", result);
    });
   //event.stopPropagation();          // stop event retrieving or bubbling onto parent or further elements  
    //event.stopImmediatePropagation(); // stop event retrieving or bubbling onto parents or up and peers
  }

  toggleRow(event: any, element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    // <td mat-cell col="name" *matCellDef="let element"> {{element.symbol}} </td>
    const col = event.target.attributes.col?.value;
    if (col === 'name')
      return;
    // const classList = event.target?.classList?.value;
    // if (classList?.includes("key")) 
    //   return;
    element.expanded = !element.expanded
  }

  toggleAllRowsNeedDetailExpanded() {
    this.dataSource.data.forEach((row: any) => {
      row.expanded = this.allRowsNeedDetailExpanded;
    })
    this.allRowsNeedDetailExpanded = !this.allRowsNeedDetailExpanded;
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
