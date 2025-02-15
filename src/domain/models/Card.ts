import { CardColor, CardValue, CardPoints } from "../types/index.js";

export class Card {
  constructor(
    private readonly color: CardColor,
    private readonly value: CardValue,
    private readonly points: CardPoints,
    private readonly image: string
  ) {}

  getColor(): CardColor {
    return this.color;
  }

  getValue(): CardValue {
    return this.value;
  }

  getPoints(): CardPoints {
    return this.points;
  }

  getImage(): string {
    return this.image;
  }

  isWild(): boolean {
    return this.color === "wild";
  }

  matches(other: Card): boolean {
    if (this.isWild() || other.isWild()) return true;
    return this.color === other.color || this.value === other.value;
  }
}
