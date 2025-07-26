import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangeRhinoComponent } from './orange-rhino.component';

describe('OrangeRhinoComponent', () => {
  let component: OrangeRhinoComponent;
  let fixture: ComponentFixture<OrangeRhinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrangeRhinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrangeRhinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
