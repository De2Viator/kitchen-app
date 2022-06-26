import { Component, Input } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-alert',
  template: `
  <div *ngIf="message">
  <div class="backdrop"></div>
  <div class="alert-box">
     {{ message }}
    <div class="alert-box__action">
      <button class="btn btn-info" (click)="onClose()">Close</button>
    </div>
  </div>
</div>
`,
  styles: [`
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.75);
    z-index: 5;
  }

  .alert-box {
    position: fixed;
    top: 30vh;
    left: 20vw;
    width: 60vw;
    padding: 16px;
    z-index: 6;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
  }

.alert-box__actions{
    text-align: center;
}`],
standalone:true,
//imports:[BrowserModule]
})
export class AlertComponent {
  @Input() message:string|null = null;

  onClose() {
    this.message = null;
  }
}
