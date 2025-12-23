import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  sectionList = [
    {
      sectionTitle: 'Section 1',
      images: [
        {
          src: 'assets/images/gallery/pic1.jpg',
          description: 'Children attending morning class',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.'
        },
        {
          src: 'assets/images/gallery/pic2.jpg',
          description: 'Students learning together',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.'
        },
        {
          src: 'assets/images/gallery/pic3.jpg',
          description: 'Group activity session',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.'
        },
        {
          src: 'assets/images/gallery/pic5.jpg',
          description: 'Group activity session',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.'
        },
        {
          src: 'assets/images/gallery/pic6.jpg',
          description: 'Group activity session',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.'
        },
        {
          src: 'assets/images/gallery/pic7.jpg',
          description: 'Group activity session',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.' 
        },
      ],
    },
    {
      sectionTitle: 'Section 2',
      images: [
        {
          src: 'assets/images/gallery/pic4.jpg',
          description: 'Group activity session',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.'
        },
        {
          src: 'assets/images/gallery/pic8.jpg',
          description: 'Group activity session',
          details: 'Children engaged in a focused morning session, revising lessons and interacting with volunteers.'
        },
      ],
    },
  ];

  selectedImage: any | null = null;
  isClosing = false;
  openModal(img: any) {
    this.isClosing = false;
    this.selectedImage = img;
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.selectedImage = null;
      this.isClosing = false;
    }, 250);
  }
}
