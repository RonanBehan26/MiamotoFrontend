import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  @Input() currentQuote: string = '';  // Add @Input() for currentQuote
  @Output() quoteChanged = new EventEmitter<string>();

  quotes: string[] = [];

  constructor(private httpService: MyHttpService) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.httpService.getQuotes().subscribe(
      (data: string[]) => {
        this.quotes = data;
        this.currentQuote = this.quotes[0]; // Set initial quote
      },
      (error) => console.error('Error fetching quotes', error)
    );
  }

  getNewQuote() {
    if (this.quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      this.currentQuote = this.quotes[randomIndex];
      this.quoteChanged.emit(this.currentQuote);  // Emit the selected quote
    }
  }
}
