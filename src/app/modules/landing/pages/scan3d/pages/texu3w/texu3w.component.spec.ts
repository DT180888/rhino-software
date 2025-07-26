import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Texu3wComponent } from './texu3w.component';

describe('Texu3wComponent', () => {
  let component: Texu3wComponent;
  let fixture: ComponentFixture<Texu3wComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Texu3wComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Texu3wComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
