import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoxelDanceComponent } from './voxel-dance.component';

describe('VoxelDanceComponent', () => {
  let component: VoxelDanceComponent;
  let fixture: ComponentFixture<VoxelDanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoxelDanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoxelDanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
