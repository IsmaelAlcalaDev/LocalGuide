import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-resena',
  templateUrl: './dialogo-resena.component.html',
  styleUrls: ['./dialogo-resena.component.scss']
})
export class DialogoResenaComponent {
  resena: string = '';
  score: number = 0;
  reservationData: any = [];
  stars = [
    { value: 1, icon: 'star_border' },
    { value: 2, icon: 'star_border' },
    { value: 3, icon: 'star_border' },
    { value: 4, icon: 'star_border' },
    { value: 5, icon: 'star_border' }
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogoResenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.reservationData = data.reservationData; }

  cerrarDialogo(): void {
    if (this.resena) {
      this.dialogRef.close({ resena: this.resena, score: this.score });
    } else {
      this.dialogRef.close(null);
    }
  }

  setRating(score: number): void {
    this.score = score;
    this.stars.forEach((star, index) => {
      star.icon = index < score ? 'star' : 'star_border';
    });
  }
}
