import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
constructor(private router: Router, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const checkbox = this.el.nativeElement.querySelector('input[type="checkbox"]');
    const menu = this.el.nativeElement.querySelector('.menu-items');
    const target = event.target as HTMLElement;

    if (
      checkbox?.checked &&
      !this.el.nativeElement.contains(target) &&
      !target.closest('.menu-items')
    ) {
      checkbox.checked = false;
      this.enableBodyScroll();
    }
  }

  closeMenu(): void {
    const checkbox = this.el.nativeElement.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = false;
      this.enableBodyScroll();
    }
  }

  toggleMenu(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
    }
  }

  disableBodyScroll(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  enableBodyScroll(): void {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }
}
