import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'dialog-animations-example',
  styles: [ 'button { margin-right: 8px; }'],
  template: `
    <button mat-raised-button (click)="openDialog('0ms', '0ms')">Open dialog without animation</button>
    <button mat-raised-button (click)="openDialog('3000ms', '1500ms')">Open dialog slowly</button>
    <button mat-raised-button (click)="openConfirmationDialog('Are you sure?')">Open confirmation dialog</button>
    <p>Confirmed: <b>{{ confirmed }}</b></p>
  `  
})
export class DialogAnimationsExample {
  confirmed: boolean = false;

  constructor(private dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        animal: 'panda',
      }
    });
  }

  openConfirmationDialog(text: string) {
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
        this.confirmed = result;
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h2 mat-dialog-title>Delete file</h2>
    <div mat-dialog-content>
      Would you like to delete cat.jpeg?
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
    </div>
    <p>{{ data.animal }}</p>
  `
})
export class DialogAnimationsExampleDialog {
  constructor(private dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

@Component({
  selector: 'confirmation-dialog',
  template: `
    <p><b [innerHTML]="data?.text"></b></p>
    <div id="actions-container" style="margin-left:50px;float:right;margin-top:30px">
      <button mat-raised-button color="primary" (click)="confirm()">{{data?.confirmButtonLabel}}</button>
      <button mat-raised-button color="warn" (click)="cancel()" *ngIf="!data?.oneButton">{{data?.cancelButtonLabel}}</button>
    </div>
  `
})
export class ConfirmationDialogComponent {
   
    constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.data.oneButton = this.data.oneButton || data.showConfirm;     
        if (this.data.oneButton) {
          this.data.confirmButtonLabel = data.confirmButtonText ?? 'OKAY';
        } 
        else {  
          this.data.confirmButtonLabel = data.confirmButtonText ?? 'CONFIRM';
          this.data.cancelButtonLabel = data.cancelButtonText ?? 'CANCEL';
        }
    }

    confirm(){
       this.dialogRef.close(true);
    }
    
    cancel(){
       this.dialogRef.close(false);
    }
}
       