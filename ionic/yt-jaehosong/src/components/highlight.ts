import {Directive, ElementRef} from '@angular/core';

@Directive({
  'selector': '[highlight]'
})

export class Highlight {
  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'white';
    el.nativeElement.style.backgroundColor = 'blue';
  }
}

// import {Directive, ElementRef, Renderer} from '@angular/core';

// @Directive({
//   'selector': '[highlight]'
// })

// export class Highlight {
//   constructor(el: ElementRef, renderer: Renderer) {
//     renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'blue');
//     renderer.setElementStyle(el.nativeElement, 'color', 'white');
//   }
// }
