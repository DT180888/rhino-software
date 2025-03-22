/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
})
export class TypewriterDirective implements OnInit, OnDestroy {
  @Input() text: string = '';
  @Input() delay: number = 100;
  @Input() initialDelay: number = 500;
  @Input() eraseDelay: number = 50;
  @Input() loop: boolean = false;
  @Output() typewritingComplete = new EventEmitter<void>();

  private typing = false;
  private destroyed = false;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.startTyping();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  private async startTyping(): Promise<void> {
    if (this.typing) return;
    this.typing = true;

    while (!this.destroyed) {
      this.el.nativeElement.innerHTML = '';
      await this.wait(this.initialDelay);

      // Type text
      for (let i = 0; i < this.text.length; i++) {
        if (this.destroyed) break;
        this.el.nativeElement.innerHTML += this.text.charAt(i);
        await this.wait(this.delay);
      }

      this.ngZone.run(() => {
        this.typewritingComplete.emit();
      });

      if (!this.loop) break;

      // Wait before erasing
      await this.wait(2000);

      // Erase text
      for (let i = this.text.length; i > 0; i--) {
        if (this.destroyed) break;
        this.el.nativeElement.innerHTML = this.text.substring(0, i - 1);
        await this.wait(this.eraseDelay);
      }

      await this.wait(1000);
    }

    this.typing = false;
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}