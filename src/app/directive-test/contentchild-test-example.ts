import { Component, ContentChild, ContentChildren, Directive, Input, OnInit, AfterContentInit } from '@angular/core';

// Directive pane-directive
@Directive({selector: 'pane-directive'})
export class PaneDirective {
  @Input() id!: string;
}

// Component TabExapleComponent
@Component({
  selector: 'app-tab-example',
  template: `
    <div><em>Pane:</em> {{pane.id}}</div>
  `
})
export class TabExamampleComponent implements OnInit, AfterContentInit {
  // query sub component(s)
  @ContentChild(PaneDirective) pane!: PaneDirective;
  @ContentChild(PaneDirective) panes!: Array<PaneDirective>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    console.log("Pan: ", this.pane);
    console.log("Pans: ", this.panes)         
  }
}

// Component ContentChildTestExampleComponent
@Component({
  selector: 'contentchild-test-example',
  template: `
    <div>
      <h2>ContentChild Directive Example</h2>
      <app-tab-example>
        <pane-directive id="1" *ngIf="shouldShow; else id_2"></pane-directive>
        
        <ng-template #id_2>
          <pane-directive id="2" *ngIf="!shouldShow"></pane-directive>
        </ng-template>
      </app-tab-example>

      <button (click)="toggle()">Toggle</button>
    </div>
  `,
})
export class ContentChildTestExampleComponent {
  shouldShow = true;

  toggle() {
    this.shouldShow = !this.shouldShow;
  }
}