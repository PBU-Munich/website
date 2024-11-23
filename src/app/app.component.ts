import { Component, OnInit } from '@angular/core';
import {CommonModule } from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, MatCard, MatCardTitle, MatCardContent, MatIcon],
})
export class AppComponent implements OnInit {
  events: { title: string; date: string ; link: string; location: string}[] = [];
  apiKey = 'AIzaSyDEDBJrAjmclH7RH9HuR2ACrYi5eNKgMuc'; // Ersetze mit deinem API-Schlüssel
  calendarId = 'pbumunich@gmail.com'; // Ersetze mit deiner Kalender-ID


  ngOnInit() {
    this.fetchCalendarEvents();
  }

  async fetchCalendarEvents() {
    const timeMin = new Date().toISOString(); // Startzeit (aktuell)
    const maxResults = 3; // Maximale Anzahl von Events

    const url = `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}&timeMin=${timeMin}&maxResults=${maxResults}&orderBy=startTime&singleEvents=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        this.events = data.items.map((item: any) => ({
          title: item.summary || 'No Title',
          date: new Date(item.start.dateTime || item.start.date).toLocaleString(),
          link: item.htmlLink,
          location: item.location || 'No Location'
        }));
      } else {
        console.error('No events found in the calendar.');
        this.events = [];
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      this.events = [];
    }
  }
  openInstagram() {
    window.open('https://www.instagram.com/plantbasedunismunich/')
  }
  openWhatsapp() {
    window.open('https://chat.whatsapp.com/EoKqEEgcioFCaXjYuFenPq')
  }
  openPetition() {
    window.open('https://forms.gle/UxDebthb46RHTagY6')
  }
  getImageSrc(title: string): string {
    if (!title) {
      return 'assets/Default.png';
    }
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('cooking')) {
      return 'Cooking.png';
    } else if (lowerTitle.includes('meeting')) {
      return 'Meeting.png';
    } else if (lowerTitle.includes('meet and greet')) {
      return 'MeetAndGreet.png';
    } else if (lowerTitle.includes('outreach')) {
      return 'Outreach.png';
    } else {
      return 'Default.png';  // Standardbild, wenn keine Bedingung erfüllt ist
    }
  }
}
