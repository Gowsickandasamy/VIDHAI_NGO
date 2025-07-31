import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements AfterViewInit {
  timeline = [
    {
      year: '2011',
      title: 'Our nice super title',
      text: 'Lorem ipsum dolor sit amet...',
      image: 'assets/images/gallery/2011.png',
    },
    {
      year: '2012',
      title: 'Another amazing year',
      text: 'Ut enim ad minim veniam...',
      image: 'assets/images/gallery/2012.png',
    },
    {
      year: '2013',
      title: 'Big milestones achieved',
      text: 'Duis aute irure dolor...',
      image: 'assets/images/gallery/2013.png',
    },
    {
      year: '2014',
      title: 'Sky was the limit',
      text: 'Excepteur sint occaecat cupidatat...',
      image: 'assets/images/gallery/2014.png',
    },
  ];

  selectedIndex = 0;
  animationClass = 'fade-up';
  private lastScrollTime = 0;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.listen(
      this.elRef.nativeElement,
      'wheel',
      (event: WheelEvent) => {
        this.handleScroll(event);
      }
    );
  }

  handleScroll(event: WheelEvent) {
    const now = Date.now();
    const scrollGap = 800;

    const isAtFirst = this.selectedIndex === 0;
    const isAtLast = this.selectedIndex === this.timeline.length - 1;

    if (now - this.lastScrollTime < scrollGap) {
      event.preventDefault();
      return;
    }

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (event.deltaX > 0 && !isAtLast) {
        event.preventDefault();
        this.triggerChange(this.selectedIndex + 1);
      } else if (event.deltaX < 0 && !isAtFirst) {
        event.preventDefault();
        this.triggerChange(this.selectedIndex - 1);
      }
    } else {
      if (event.deltaY > 0 && !isAtLast) {
        event.preventDefault();
        this.triggerChange(this.selectedIndex + 1);
      } else if (event.deltaY < 0 && !isAtFirst) {
        event.preventDefault();
        this.triggerChange(this.selectedIndex - 1);
      }
    }

    this.lastScrollTime = now;
  }

  scrollDown() {
    if (this.selectedIndex < this.timeline.length - 1) {
      this.triggerChange(this.selectedIndex + 1);
    }
  }

  scrollUp() {
    if (this.selectedIndex > 0) {
      this.triggerChange(this.selectedIndex - 1);
    }
  }

  triggerChange(index: number) {
    this.animationClass = '';
    setTimeout(() => {
      this.selectedIndex = index;
      this.animationClass = 'fade-up';
    }, 50);
  }

resetTimeline(toIndex: number = 0) {
  if (toIndex < 0 || toIndex >= this.timeline.length) {
    console.warn('Invalid timeline index');
    return;
  }

  const previousIndex = this.selectedIndex;
  this.selectedIndex = toIndex;
  this.animationClass = previousIndex !== toIndex ? 'fade-up' : this.animationClass;
}


}
