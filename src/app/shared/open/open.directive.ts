import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOpen]',
  standalone:true,
})
export class OpenDirective {
  constructor(private elRef:ElementRef, private renderer:Renderer2) { }
  show:boolean = false;
  @HostListener('click') mouseenter(){
    this.show = !this.show;
    if(this.show) {
      this.renderer.addClass(this.renderer.nextSibling(this.elRef.nativeElement),'show');
    } else {
      this.renderer.removeClass(this.renderer.nextSibling(this.elRef.nativeElement),'show')
    }
  }
}
