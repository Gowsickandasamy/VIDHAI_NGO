import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
copiedField: string | null = null

  donationInfo = {
    upiId: "vidhai@paytm",
    gpayNumber: "+91 9876543210",
    bankDetails: {
      accountName: "VIDHAI NGO",
      accountNumber: "1234567890123456",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      branch: "Chennai Main Branch",
    },
  }

  async copyToClipboard(text: string, field: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      this.copiedField = field
      setTimeout(() => {
        this.copiedField = null
      }, 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      // Fallback for older browsers
      this.fallbackCopyTextToClipboard(text, field)
    }
  }

  private fallbackCopyTextToClipboard(text: string, field: string): void {
    const textArea = document.createElement("textarea")
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand("copy")
      if (successful) {
        this.copiedField = field
        setTimeout(() => {
          this.copiedField = null
        }, 2000)
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err)
    }

    document.body.removeChild(textArea)
  }

  isCopied(field: string): boolean {
    return this.copiedField === field
  }
}
