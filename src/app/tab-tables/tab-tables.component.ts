import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-tables',
  templateUrl: './tab-tables.component.html',
  styleUrls: ['./tab-tables.component.scss']
})
export class TabTablesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Check the selective tab
  tabSelectionChanged(event: any){
    // Get the selected tab
    console.log("$event.index: ", event.index);
  
    let selectedTab = event.tab;
    console.log(selectedTab);
  }
}
