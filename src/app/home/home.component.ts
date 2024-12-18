import { Component, ViewChild } from '@angular/core';
import { QuotesComponent } from '../quotes/quotes.component';
import { JapaneseArtComponent } from '../japanese-art/japanese-art.component';
import { MyHttpService } from '../services/my-http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, QuotesComponent, JapaneseArtComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentQuote: string = '';
  currentArtwork: any = null;

  @ViewChild(JapaneseArtComponent) japaneseArtComponent!: JapaneseArtComponent;

  constructor(private myHttpService: MyHttpService) {}

  ngOnInit() {
    this.getNewQuote();  // Fetch initial quote and artwork when the component loads
  }

  getNewQuote() {
    this.myHttpService.getQuotes().subscribe(
      (quoteData: string[]) => {
        const randomIndex = Math.floor(Math.random() * quoteData.length);
        this.currentQuote = quoteData[randomIndex];
      },
      (error) => console.error('Error fetching quotes:', error)
    );

    this.myHttpService.getArtworks().subscribe(
      (artworkData: any[]) => {
        this.currentArtwork = artworkData[0];  // Get the first artwork
      },
      (error) => console.error('Error fetching artworks:', error)
    );
  }

  onQuoteChange() {
    this.japaneseArtComponent.showNextArtwork();
  }
}
