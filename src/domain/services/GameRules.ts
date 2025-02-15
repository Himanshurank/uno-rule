import { Card } from "../models/Card.js";
import { Player } from "../models/Player.js";
import { Game } from "../models/Game.js";

export class GameRules {
  static isValidPlay(currentCard: Card, playedCard: Card): boolean {
    return playedCard.matches(currentCard);
  }

  static getDrawCount(card: Card): number {
    switch (card.getValue()) {
      case "draw_2":
        return 2;
      case "wild_draw_4":
        return 4;
      default:
        return 0;
    }
  }

  static getNextPosition(
    currentPosition: number,
    playerCount: number,
    isReverse: boolean
  ): number {
    if (isReverse) {
      return currentPosition === 1 ? playerCount : currentPosition - 1;
    }
    return currentPosition === playerCount ? 1 : currentPosition + 1;
  }

  static getSkipPosition(currentPosition: number, playerCount: number): number {
    return this.getNextPosition(
      this.getNextPosition(currentPosition, playerCount, false),
      playerCount,
      false
    );
  }

  static canPlayAnyCard(player: Player, currentCard: Card): boolean {
    return player
      .getCards()
      .some((card) => this.isValidPlay(currentCard, card));
  }

  static calculatePoints(player: Player): number {
    return player.getCards().reduce((sum, card) => sum + card.getPoints(), 0);
  }

  static isGameOver(game: Game): boolean {
    const players = game.getPlayers();
    return players.some((player) => player.getCards().length === 0);
  }

  static getWinner(players: Player[]): Player | null {
    const winner = players.find((player) => player.getCards().length === 0);
    return winner || null;
  }
}
