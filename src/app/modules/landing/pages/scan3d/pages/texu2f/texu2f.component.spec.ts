import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Texu2fComponent } from './texu2f.component';

describe('Texu2fComponent', () => {
  let component: Texu2fComponent;
  let fixture: ComponentFixture<Texu2fComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Texu2fComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Texu2fComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
