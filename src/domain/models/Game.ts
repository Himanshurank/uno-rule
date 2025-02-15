import { Card } from "./Card.js";
import { Player } from "./Player.js";
import { GameState } from "../types/index.js";

export class Game {
  private currentCard: Card;
  private currentPlayer: Player;
  private players: Player[];
  private isReverse: boolean = false;
  private isGameOver: boolean = false;
  private winners: Player[] = [];

  constructor(players: Player[], firstCard: Card, startingPlayer: Player) {
    this.players = players;
    this.currentCard = firstCard;
    this.currentPlayer = startingPlayer;
  }

  getState(): GameState {
    return {
      currentCard: this.currentCard,
      currentPlayer: this.currentPlayer,
      isReverse: this.isReverse,
      isGameOver: this.isGameOver,
      winners: this.winners,
    };
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  getCurrentCard(): Card {
    return this.currentCard;
  }

  getPlayers(): Player[] {
    return [...this.players];
  }

  setCurrentCard(card: Card): void {
    this.currentCard = card;
  }

  toggleDirection(): void {
    this.isReverse = !this.isReverse;
  }

  addWinner(player: Player): void {
    this.winners.push(player);
    this.checkGameOver();
  }

  private checkGameOver(): void {
    // Game is over when all but one player has finished
    if (this.winners.length >= this.players.length - 1) {
      this.isGameOver = true;
    }
  }
}
