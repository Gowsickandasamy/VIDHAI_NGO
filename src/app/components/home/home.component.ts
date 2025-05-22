import { CUSTOM_ELEMENTS_SCHEMA, Component,  AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ButtonComponent } from '../../components-library/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements AfterViewInit, OnDestroy{

  private touchStartX = 0;
  private touchEndX = 0;
  private cleanupFns: Array<() => void> = [];
  private autoSlideInterval: any;


  constructor(private elRef: ElementRef) {
    gsap.registerPlugin(ScrollTrigger);
  }
  ngAfterViewInit(): void {
    const slider = this.elRef.nativeElement.querySelector('.slider');
    if (!slider) return;

    const activate = (e: MouseEvent) => {
      const items = slider.querySelectorAll('.item');
      const target = e.target as HTMLElement;

      if (target.matches('.next')) {
        slider.append(items[0]);
      }
      if (target.matches('.prev')) {
        slider.prepend(items[items.length - 1]);
      }
    };

    document.addEventListener('click', activate);

    slider.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleGesture(slider);
    });

    (gsap.utils.toArray(".revealUp") as Element[]).forEach((elem: Element) => {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            { duration: 1.25, y: 0, autoAlpha: 1, ease: "back", overwrite: "auto" }
          );
        },
        onLeave: () => {
          gsap.to(elem, { autoAlpha: 0 });
        },
        onEnterBack: () => {
          gsap.fromTo(
            elem,
            { y: -100, autoAlpha: 0 },
            { duration: 1.25, y: 0, autoAlpha: 1, ease: "back", overwrite: "auto" }
          );
        },
        onLeaveBack: () => {
          gsap.to(elem, { autoAlpha: 0 });
        }
      });
    });    

    this.cleanupFns.push(() => document.removeEventListener('click', activate));
    this.cleanupFns.push(() => {
      slider.removeEventListener('touchstart', () => {});
      slider.removeEventListener('touchend', () => {});
    });
    this.autoSlideInterval = setInterval(() => {
      const firstItem = slider.querySelector('.item');
      if (firstItem) {
        slider.append(firstItem);
      }
    }, 30000);
    this.cleanupFns.push(() => clearInterval(this.autoSlideInterval));
  }

 

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  private handleGesture(slider: HTMLElement) {
    const items = slider.querySelectorAll('.item');
    if (this.touchEndX < this.touchStartX - 50) {
      slider.append(items[0]);
    }
    if (this.touchEndX > this.touchStartX + 50) {
      slider.prepend(items[items.length - 1]);
    }
  }
}
