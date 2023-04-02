import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AlertTypes} from "../models/alert";

@Directive({
  selector: '[appAlert]',
  standalone: true
})
export class AlertDirective implements OnInit{
  @Input() appAlert:AlertTypes|null = null
  constructor(private el: ElementRef<HTMLDivElement>) { }
  ngOnInit() {
    this.el.nativeElement.classList.add('alert')
    console.log(this.appAlert)
    if (this.appAlert) this.el.nativeElement.classList.add(`alert-${this.appAlert}`)
  }
}
