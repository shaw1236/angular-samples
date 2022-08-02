import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly actionButtonLabel: string = 'Retry';
  readonly action: boolean = true;
  readonly autoHide: number = 2000;
  readonly horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  readonly verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public snackBar: MatSnackBar) {}

  open(value: string, actionName: string = 'Retry') {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.autoHide || 0;
    this.snackBar.open(value, actionName, config);
  }
}