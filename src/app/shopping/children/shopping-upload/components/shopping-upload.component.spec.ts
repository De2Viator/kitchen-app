import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingUploadComponent } from './shopping-upload.component';

describe('ShoppingUploadComponent', () => {
  let component: ShoppingUploadComponent;
  let fixture: ComponentFixture<ShoppingUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
