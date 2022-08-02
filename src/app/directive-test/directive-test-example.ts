import { OnInit, Component } from '@angular/core';
import { HighlightDirective } from '../directive/highlight.directive';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Table with sorting
 */
@Component({
  selector: 'directive-test-example',
  styleUrls: ['./directive-test-example.scss'],
  template: `
    <div>
      <h2>My Directive Example</h2>
      <h4 style="text-align:center;">Pick a highlight color</h4>
      <div>
        <input type="radio" name="colors" (click)="color = 'lightgreen'">Green
        <input type="radio" name="colors" (click)="color = 'yellow'">Yellow
        <input type="radio" name="colors" (click)="color = 'cyan'">Cyan
      </div>
      <p [appHighlight]="color">Highlight me!</p>
      <p [appHighlight]="color" defaultColor="violet">Highlight me too!</p>
      <h3 style="text-align:center;">ngNonBindable with a directive</h3>
      <div ngNonBindable [appHighlight]="'yellow'">
        This should not evaluate: {{ 1 + 1 }}, but will highlight yellow.
      </div>
    </div>
    <div>
      <p>
        The condition is currently
        <span [ngClass]="{ 'unless': true, 'a': !condition, 'b': condition }">{{condition}}</span>.
        <button type="button" (click)="condition = !condition" [ngClass] = "{ 'a': condition, 'b': !condition }" >
          Toggle condition to {{condition? 'false' : 'true'}}
        </button>
      </p>
      <p *appUnless="condition" class="unless a">
        (A) This paragraph is displayed because the condition is false.
      </p>
      <p *appUnless="!condition" class="unless b">
        (B) Although the condition is true,
        this paragraph is displayed because appUnless is set to false.
      </p>
    </div>
  `,
})

export class DirectiveTestExampleComponent implements OnInit {
    color: string = '';
    condition = !false;

    constructor() {}
    ngOnInit(): void {}
}