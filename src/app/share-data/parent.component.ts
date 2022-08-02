import { Component, ContentChild, AfterContentInit } from '@angular/core';

import { ItemDetailComponent } from './item-detail/item-detail.component';
  
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements AfterContentInit {
  @ContentChild(ItemDetailComponent) itemDetail!: ItemDetailComponent;

  currentItem = 'Television';

  lastChanceItem = 'Beanbag';
  items = ['item1', 'item2', 'item3', 'item4'];
  wishlist = ['Drone', 'Computer', 'MacBook'];

  constructor() {}

  ngAfterContentInit(): void {
    console.log("itemDetail: ", this.itemDetail);    
  }

  // (newItemEvent)="addItem($event)" in app-item-output
  addItem(newItem: string) {
    this.items.push(newItem);
  }

  // (deleteRequest)="crossOffItem($event)" in app-input-output
  crossOffItem(item: string) {
    console.warn(`Parent says: crossing off ${item}.`);
  }

  // (buyEvent)="buyClearanceItem($event)" in app-in-the-metadata
  buyClearanceItem(item: string) {
    console.warn(`Parent says: buying ${item}.`);
  }

  // (saveForLaterEvent)="saveForLater($event)" in app-aliasing
  saveForLater(item: string) {
    console.warn(`Parent says: saving ${item} for later.`);
  }

  // (wishEvent)="addToWishList($event)" in app-aliasing
  addToWishList(wish: string) {
    console.warn(`Parent says: adding ${this.currentItem} to your wishlist.`);
    this.wishlist.push(wish);
    console.warn(this.wishlist);
  }
}

