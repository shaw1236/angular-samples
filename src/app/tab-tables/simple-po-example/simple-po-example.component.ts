import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-simple-po-example',
  templateUrl: './simple-po-example.component.html',
  styleUrls: ['./simple-po-example.component.scss']
})
export class SimplePoExampleComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any[]>;
  
  po: FormGroup;
  readonly displayedColumns: any[] = ['product', 'quantity', 'rate', 'total', 'action'];
  summary = { has: true, quantity: 0, total: 0 };

  constructor(private formBuilder: FormBuilder) { 
    this.po = this.formBuilder.group({
      po: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      items: this.formBuilder.array([ this.createPOItemForm() ]) // PO 1st item row
    });
  }

  ngOnInit(): void {
  }

  createPOItemForm(): FormGroup {
    //const qtyValidationPattern = '^[0-9]{1,2}$';
    const lineControlGroup = this.formBuilder.group({
      product: ['', Validators.required],
      //quantity: ['1', [Validators.required, Validators.pattern(qtyValidationPattern)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.min(0.01)]],
      total: [0, [Validators.min(0.01)]]
    });
    return lineControlGroup;
  }

  // getter for PO Item FormArray
  get poItemFormArray(): FormArray {
      return this.po.get('items') as FormArray;
  }

  // Calculate the sub totals: quantity & total
  calcSummary() {
    this.summary.quantity = 0;  this.summary.total = 0; 
    for (const value of this.poItemFormArray['value']) {
      this.summary.quantity += Number(value.quantity);
      this.summary.total += value.total; 
    }
  }

  onRemoveProduct(i: number) {
    const poItemFormArray = this.poItemFormArray;
    if (poItemFormArray.length > 1) {
      poItemFormArray.removeAt(i);
    }
    else { // one line, clear the contents
      const rowsControl: any[] = poItemFormArray.controls;
      const rowControl = rowsControl[i]['controls'];
      //const fields = ['product', 'expiryDate', 'partNumber', 'imageUrl', 'quantity', 'sku']
      for (const each of Object.keys(rowControl)) {
        if (each === 'quantity')
          rowControl[each].setValue('1');  // initialize quantity 
        else  
          rowControl[each].setValue('');
      }
    }
    this.calcSummary();  // recalculate the totals

    this.table.renderRows();
  }

  // Qty/Rate changed
  onPriceChange(idx: number, event: any) {
    const poItemFormArray = this.poItemFormArray;
    const data = poItemFormArray['value'][idx];
    const rowsControl: any[] = poItemFormArray.controls;
    const rowControl = rowsControl[idx]['controls'];

    const total = data.rate * Number(data.quantity);
    rowControl.total.setValue(total);
    this.calcSummary();
  }

  // Qty key pressed
  onQtyKeyPress(event: any) {
    const value = event.target.value + event.key;
    if (value && (value.length > 2 || !value.match('^[0-9]{1,2}$'))) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  close() {
  }

  onCreatePO() {    
  }

  get isItemsValid() {
    return this.poItemFormArray['controls'].every(({ valid, value }) => valid && value.rate > 0);
  }

  onAdd(): void {
    this.poItemFormArray.push(this.createPOItemForm());
    this.table.renderRows();
  }
}
