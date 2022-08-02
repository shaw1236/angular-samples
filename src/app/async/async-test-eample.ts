import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-async',
  template: `
    <div>
      <h2>Async Example</h2>
    </div>
    <div>
        <code>Promise | async</code>:
        <button (click)="clicked()">{{ arrived ? 'Reset' : 'Resolve' }}</button>
        <span>Wait for it... {{ greeting | async }}</span>
    </div>
    <div><code>Observable | async</code>: Time: {{ time | async }}</div>
    `
})

export class AsyncTestExampleComponent {
  greeting: Promise<string>|null = null;
  arrived: boolean = false;

  time: Observable<string>|null = null;

  private resolve: Function|null = null;

  constructor() {
    this.reset();
  }

  reset() {
    this.arrived = false;
    this.time = null;
    this.greeting = new Promise<string>((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  clicked() {
    if (this.arrived) {
      this.reset();
    } else {
        this.time = new Observable<string>((observer: Observer<string>) => {
            setInterval(() => observer.next(new Date().toString()), 1000);
        });
        
        this.resolve!('hi there!');
        this.arrived = true;
    }
  }
}
