import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({ providedIn: 'root'})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

config: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
};

  uspjesno(msg) {
    this.config['panelClass'] = ['notification', 'uspjesno'];
    this.snackBar.open(msg, '', this.config );
  }

  upozorenje(msg) {
    this.config['panelClass'] = ['notification', 'upozorenje'];
    this.snackBar.open(msg, '', this.config );
  }
}
