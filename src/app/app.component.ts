import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, MatCard, MatCardTitle, MatCardContent],
})
export class AppComponent implements OnInit {
  events: { title: string; date: string; link: string; location: string; description: string }[] = [];
  apiKey = 'AIzaSyDEDBJrAjmclH7RH9HuR2ACrYi5eNKgMuc'; // Ersetze mit deinem API-Schlüssel
  calendarId = 'pbumunich@gmail.com'; // Ersetze mit deiner Kalender-ID
  allCardsExpanded: boolean = false; // Neuer Zustand für alle Karten

  ngOnInit() {
    this.fetchCalendarEvents();
  }

  async fetchCalendarEvents() {
    const timeMin = new Date().toISOString();
    const maxResults = 3;

    const url = `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}&timeMin=${timeMin}&maxResults=${maxResults}&orderBy=startTime&singleEvents=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        this.events = data.items.map((item: any) => ({
          title: item.summary || 'No Title',
          date: new Date(item.start.dateTime || item.start.date).toLocaleString(),
          link: item.htmlLink,
          location: item.location || 'No Location',
          description: item.description || 'Join us and see for yourself what it\'s all about ;)'
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

  toggleAllCards(): void {
    this.allCardsExpanded = !this.allCardsExpanded;
  }

  isCardExpanded(index: number): boolean {
    return this.allCardsExpanded; // Gibt immer 'true' zurück, wenn 'allCardsExpanded' wahr ist
  }
  openPetition() {
    window.open('https://forms.gle/UxDebthb46RHTagY6');
  }

  openSurvey() {
    window.open('https://evasys.zv.tum.de/evasys/public/online/index/index?online_php=&p=uref25&ONLINEID=8840453568633346174860232291902637075836');
  }

  openSignup() {
    window.open('https://forms.gle/XzvvMP7NjnsA1cxv7')
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
    } else if (lowerTitle.includes('camp')) {
      return 'Camp.png';
    } else {
      return 'Default.png';
    }
  }

}
