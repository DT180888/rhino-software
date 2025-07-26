import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printer3dComponent } from './printer3d.component';

describe('Printer3dComponent', () => {
  let component: Printer3dComponent;
  let fixture: ComponentFixture<Printer3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Printer3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Printer3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
