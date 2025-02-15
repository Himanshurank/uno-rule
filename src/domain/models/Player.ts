import { Card } from "./Card.js";

export class Player {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private position: number,
    private cards: Card[] = [],
    private points: number = 0,
    private readonly isAdmin: boolean = false
  ) {}

  addCards(cards: Card | Card[]): void {
    if (Array.isArray(cards)) {
      this.cards.push(...cards);
    } else {
      this.cards.push(cards);
    }
  }

  removeCard(index: number): Card {
    return this.cards.splice(index, 1)[0];
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  calculatePoints(): number {
    return this.cards.reduce((sum, card) => sum + card.getPoints(), 0);
  }

  hasPlayableCard(currentCard: Card): boolean {
    return this.cards.some((card) => card.matches(currentCard));
  }
}
