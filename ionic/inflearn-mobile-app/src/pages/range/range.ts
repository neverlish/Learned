import { Component } from '@angular/core';

@Component({
  templateUrl: 'range.html',
})

export class RangePage {
  contrast: number = 0;
  strokes = { lower: 30, upper: 60 };
  warmth: number = 120;
}
