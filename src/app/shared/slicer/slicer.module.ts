import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicerPipe } from './slicer.pipe';



@NgModule({
  declarations: [SlicerPipe],
  imports: [CommonModule],
  exports:[SlicerPipe],
})
export class SlicerModule { }
