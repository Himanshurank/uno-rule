import { Card } from "../models/Card.js";
import { Player } from "../models/Player.js";

export type CardColor = "red" | "blue" | "green" | "yellow" | "wild";
export type CardValue =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "skip"
  | "reverse"
  | "draw_2"
  | "wild"
  | "wild_draw_4";
export type CardPoints = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 20 | 50;

export interface GameState {
  currentCard: Card;
  currentPlayer: Player;
  isReverse: boolean;
  isGameOver: boolean;
  winners: Player[];
}
