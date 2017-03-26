import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  templateUrl: 'slides.html',
})

export class SlidePage {
  @ViewChild(Slides) childSlides: Slides;

  slides = [
    {
      img: 'assets/img/ica-slidebox-img-1.png',
      title: 'Welcome to the Docs!',
      content: 'The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.',
    },
    {
      img: 'assets/img/ica-slidebox-img-2.png',
      title: 'What is Ionic?',
      content: '<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and Javascript.',
    },
    {
      img: 'assets/img/ica-slidebox-img-3.png',
      title: 'What is Ionic Cloud?',
      content: 'The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.',
    },
  ];

  skip() {
    let lastIndex = this.childSlides.length() - 1;
    this.childSlides.slideTo(lastIndex, 0);
  }
}
