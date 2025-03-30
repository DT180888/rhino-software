import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scan3dComponent } from './scan3d.component';

describe('Scan3dComponent', () => {
  let component: Scan3dComponent;
  let fixture: ComponentFixture<Scan3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scan3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scan3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
