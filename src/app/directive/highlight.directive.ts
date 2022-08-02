import { Directive, ElementRef, HostListener, Input } from '@angular/core';

//  remove row spcing
// <p style="margin-bottom:0;">
//     Line 1
// </p>
// <p style="margin:0; padding-top:1;">
//     Line 2
// </p>
// <p style="margin:0; padding-top:1;">

// Directive: [appHighlight]
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
    @Input() appHighlight = '';
    @Input() defaultColor = '';

    constructor(private el: ElementRef) {
    //    const { style }  = this.el.nativeElement;
    //    // 1em is equal to the current font size. The default text size in browsers is 16px. So, the default size of 1em is 16px.

    //    style.backgroundColor = 'yellow';
    //    style.fontWeight = 'bold';        
    //    console.log("style:", style);
    }

    @HostListener('mouseenter') onMouseEnter() {
        //this.highlight('yellow');
        this.highlight(this.appHighlight || this.defaultColor || 'red');
    }
    
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }
    
    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}