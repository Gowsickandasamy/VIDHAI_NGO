import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  organization = {
    name: 'VIDHAI',
    email: 'info@vidhai.org',
    phone: '+91 98765 43210',
    address: 'Chennai, Tamil Nadu, India'
  };
}
