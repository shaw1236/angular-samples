import { Component, OnInit } from '@angular/core';

interface Transaction {
  id   : number;
  item : string;
  cost : number;
}

@Component({
  selector: 'app-table-footer-example',
  templateUrl: './table-footer-example.component.html',
  styleUrls: ['./table-footer-example.component.scss']
})
export class TableFooterExampleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'item', 'cost'];
  transactions: Transaction[] = [
    { id: 1, item: 'Beach ball', cost: 4 },
    { id: 2, item: 'Towel', cost: 5 },
    { id: 3, item: 'Frisbee', cost: 2 },
    { id: 4, item: 'Sunscreen', cost: 4 },
    { id: 5, item: 'Cooler', cost: 25 },
    { id: 6, item: 'Swim suit', cost: 15 },
    { id: 7, item: 'Free', cost: 0 },
    { id: 8, item: 'Big number', cost: 1200 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  
}