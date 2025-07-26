import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Texu630wComponent } from './texu630w.component';

describe('Texu630wComponent', () => {
  let component: Texu630wComponent;
  let fixture: ComponentFixture<Texu630wComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Texu630wComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Texu630wComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
