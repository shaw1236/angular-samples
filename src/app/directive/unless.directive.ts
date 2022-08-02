// Structural directives
// Structural directives are directives which change the DOM layout by adding and removing DOM element.
// built-in structural directives examples: ngIf, ngForOf, gSwitch etc
// <div *ngIf="hero" class="name">{{hero.name}}</div> transformed =>
// <ng-template [ngIf]="hero"><div class="name">{{hero.name}}</div></ng-template>

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
 @Directive({ selector: '[appUnless]'})
 export class UnlessDirective {
    private hasView = false;
    
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }
    
    @Input() set appUnless(condition: boolean) {
        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}