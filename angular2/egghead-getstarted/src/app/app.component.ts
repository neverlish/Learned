import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ul>
        <app-simple-form
          *ngFor="let message of mail.messages"
          [message]="message"
        >

        </app-simple-form>
      </ul>
    </div>
  `
})
export class AppComponent {
  title = "Let's get started!";

  constructor(
    @Inject('mail') private mail
  ){}
}
