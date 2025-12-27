import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EventImage {
  src: string;
  description: string;
}

interface GalleryEvent {
  id: string;
  title: string;
  summary: string;      // short text to show under cover image
  images: EventImage[]; // all images for that event
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  events: GalleryEvent[] = [
    {
      id: 'event-morning-class',
      title: 'Morning Learning Moments',
      summary: 'Children attending focused morning classes with volunteers.',
      images: [
        {
          src: 'assets/images/gallery/pic1.jpg',
          description: 'Intro session.',
        },
        {
          src: 'assets/images/gallery/pic2.jpg',
          description: 'Students learning together.',
        },
        {
          src: 'assets/images/gallery/pic3.jpg',
          description: 'Group activity session.',
        },
      ],
    },
    {
      id: 'event-activity-day',
      title: 'Activity Day Highlights',
      summary: 'Fun group activities that build confidence and teamwork.',
      images: [
        {
          src: 'assets/images/gallery/pic5.jpg',
          description: 'Creative circle.',
        },
        {
          src: 'assets/images/gallery/pic6.jpg',
          description: 'Team challenges.',
        },
        {
          src: 'assets/images/gallery/pic7.jpg',
          description: 'Joyful moments.',
        },
      ],
    },
    {
      id: 'event-outdoor',
      title: 'Outdoor Celebrations',
      summary: 'Special outdoor events full of energy and smiles.',
      images: [
        { src: 'assets/images/gallery/pic4.jpg', description: 'Outdoor fun.' },
        {
          src: 'assets/images/gallery/pic8.jpg',
          description: 'Celebration day.',
        },
      ],
    },
  ];

  selectedEvent: GalleryEvent | null = null;
  currentEventIndex = 0;
  isClosing = false;

  openEventModal(event: GalleryEvent) {
    this.isClosing = false;
    this.selectedEvent = event;
    this.currentEventIndex = 0;
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.selectedEvent = null;
      this.currentEventIndex = 0;
      this.isClosing = false;
    }, 250);
  }

  showPrev() {
    if (!this.selectedEvent) return;
    const len = this.selectedEvent.images.length;
    this.currentEventIndex = (this.currentEventIndex - 1 + len) % len;
  }

  showNext() {
    if (!this.selectedEvent) return;
    const len = this.selectedEvent.images.length;
    this.currentEventIndex = (this.currentEventIndex + 1) % len;
  }

  goToImage(index: number) {
    this.currentEventIndex = index;
  }

  get currentImage() {
    if (!this.selectedEvent) return null;
    return this.selectedEvent.images[this.currentEventIndex];
  }
}
