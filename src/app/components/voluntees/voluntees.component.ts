import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-voluntees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './voluntees.component.html',
  styleUrl: './voluntees.component.css',
})
export class VolunteesComponent implements OnInit {
@ViewChild('volunteerFormRef') volunteerFormRef!: NgForm;
  form = {
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  };

  today: string | undefined;

  statusMessage = '';
  isSuccess = false;
  isError = false;
  isSending = false;

  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  onSubmit(): void {
    const form = this.volunteerFormRef;
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }

    this.isSending = true;
    this.statusMessage = '';
    this.isSuccess = false;
    this.isError = false;


    emailjs
      .sendForm(
        'service_qurf7jh',
        'template_vpnx6sh',
        this.volunteerFormRef.form.value,
        '73GYmeZIWC6qpzdam'
      )
      .then((result: EmailJSResponseStatus) => {
        this.isSending = false;
        this.isSuccess = true;
        this.statusMessage = 'Message sent successfully!';
        form.resetForm();
      })
      .catch((error) => {
        this.isSending = false;
        this.isError = true;
        this.statusMessage = 'Failed to send message.';
        console.error('EmailJS error:', error);
      });
  }
}
