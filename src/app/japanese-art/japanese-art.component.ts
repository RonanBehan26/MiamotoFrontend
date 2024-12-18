import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-japanese-art',
  standalone: true,
  templateUrl: './japanese-art.component.html',
  styleUrls: ['./japanese-art.component.css']
})
export class JapaneseArtComponent {
  @Input() currentArtwork: any = null;  // Add the @Input() decorator here
  artworks: any[] = [];
  private artworkIndex = 0;

  constructor(private httpService: MyHttpService) {}

  ngOnInit() {
    this.loadArtworks();
  }

  loadArtworks() {
    this.httpService.getArtworks().subscribe(
      (data: any[]) => {
        this.artworks = data;
        if (this.artworks.length > 0) {
          this.currentArtwork = this.artworks[0]; // Set the first artwork if not provided
        }
      },
      (error) => console.error('Error fetching artworks:', error)
    );
  }

  showNextArtwork() {
    if (this.artworks.length > 0) {
      this.artworkIndex = (this.artworkIndex + 1) % this.artworks.length;
      this.currentArtwork = this.artworks[this.artworkIndex];
    }
  }
}
