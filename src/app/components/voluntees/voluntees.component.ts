import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-voluntees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './voluntees.component.html',
  styleUrl: './voluntees.component.css'
})
export class VolunteesComponent implements OnInit{
  @ViewChild('volunteerFormRef') volunteerFormRef!: ElementRef<HTMLFormElement>;

  statusMessage = '';
  isSuccess = false;
  isError = false;
  isSending = false;

  ngOnInit(): void {
  }

  onSubmit(): void {
  const form = this.volunteerFormRef.nativeElement;
  
  // Prevent submission if form is invalid
  if (!form.checkValidity()) {
    this.statusMessage = 'Please fill all required fields correctly.';
    this.isError = true;
    this.isSuccess = false;
    this.isSending = false;
    return;
  }

  this.isSending = true;
  this.statusMessage = '';
  this.isSuccess = false;
  this.isError = false;

  emailjs.sendForm(
    'service_qurf7jh',
    'template_vpnx6sh',
    form,
    '73GYmeZIWC6qpzdam'
  )
  .then((result: EmailJSResponseStatus) => {
    this.isSending = false;
    this.isSuccess = true;
    this.statusMessage = 'Message sent successfully!';
    form.reset();
  })
  .catch(error => {
    this.isSending = false;
    this.isError = true;
    this.statusMessage = 'Failed to send message.';
    console.error('EmailJS error:', error);
  });
}

}
