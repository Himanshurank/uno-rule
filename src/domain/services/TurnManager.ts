import { Player } from "../models/Player.js";
import { Card } from "../models/Card.js";
import { GameRules } from "./GameRules.js";

export class TurnManager {
  private players: Player[];
  private currentPlayerIndex: number;
  private isReverse: boolean;

  constructor(players: Player[], startingPlayerIndex: number = 0) {
    this.players = [...players];
    this.currentPlayerIndex = startingPlayerIndex;
    this.isReverse = false;
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  nextTurn(playedCard?: Card): void {
    if (playedCard?.getValue() === "reverse") {
      this.isReverse = !this.isReverse;
    }

    if (playedCard?.getValue() === "skip") {
      this.currentPlayerIndex = this.getNextPlayerIndex();
    }

    this.currentPlayerIndex = this.getNextPlayerIndex();
  }

  private getNextPlayerIndex(): number {
    const nextIndex = this.isReverse
      ? this.currentPlayerIndex - 1
      : this.currentPlayerIndex + 1;

    if (nextIndex >= this.players.length) {
      return 0;
    }
    if (nextIndex < 0) {
      return this.players.length - 1;
    }
    return nextIndex;
  }

  isReversed(): boolean {
    return this.isReverse;
  }
}
