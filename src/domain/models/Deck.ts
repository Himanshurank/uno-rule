import { Card } from "./Card.js";
import { CardColor, CardValue, CardPoints } from "../types/index.js";

export class Deck {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = [...cards];
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(count: number = 1): Card[] {
    if (this.cards.length < count) {
      throw new Error("Not enough cards in deck");
    }
    return this.cards.splice(0, count);
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  getSize(): number {
    return this.cards.length;
  }

  static createStandardDeck(): Deck {
    const cards: Card[] = [];
    const colors: CardColor[] = ["red", "blue", "green", "yellow"];
    const numbers: CardValue[] = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    const specials: CardValue[] = ["skip", "reverse", "draw_2"];

    // Add number cards (0-9)
    colors.forEach((color) => {
      numbers.forEach((value) => {
        const points = Number(value) as CardPoints;
        cards.push(new Card(color, value, points, ""));
        if (value !== "0") {
          // Add second copy of non-zero numbers
          cards.push(new Card(color, value, points, ""));
        }
      });
    });

    // Add special cards
    colors.forEach((color) => {
      specials.forEach((value) => {
        cards.push(new Card(color, value, 20, ""));
        cards.push(new Card(color, value, 20, "")); // Two of each
      });
    });

    // Add wild cards
    for (let i = 0; i < 4; i++) {
      cards.push(new Card("wild", "wild", 50, ""));
      cards.push(new Card("wild", "wild_draw_4", 50, ""));
    }

    return new Deck(cards);
  }
}
