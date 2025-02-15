import { Game, Player, Card, Deck, GameRules } from "../index.js";

describe("Uno Game Rules", () => {
  let deck: Deck;
  let players: Player[];
  let game: Game;

  beforeEach(() => {
    // Setup fresh game state
    deck = Deck.createStandardDeck();
    players = [
      new Player("1", "Player 1", 1),
      new Player("2", "Player 2", 2),
      new Player("3", "Player 3", 3),
    ];

    // Deal cards
    players.forEach((player) => {
      player.addCards(deck.draw(5));
    });

    const firstCard = deck.draw(1)[0];
    game = new Game(players, firstCard, players[0]);
  });

  test("should validate card matching rules", () => {
    const redCard = new Card("red", "5", 5, "");
    const blueCard = new Card("blue", "5", 5, "");
    const redSeven = new Card("red", "7", 7, "");
    const wildCard = new Card("wild", "wild", 50, "");

    expect(GameRules.isValidPlay(redCard, blueCard)).toBe(true); // Same number
    expect(GameRules.isValidPlay(redCard, redSeven)).toBe(true); // Same color
    expect(GameRules.isValidPlay(redCard, wildCard)).toBe(true); // Wild card
  });

  test("should handle draw cards correctly", () => {
    const drawTwo = new Card("red", "draw_2", 20, "");
    const drawFour = new Card("wild", "wild_draw_4", 50, "");

    expect(GameRules.getDrawCount(drawTwo)).toBe(2);
    expect(GameRules.getDrawCount(drawFour)).toBe(4);
  });

  test("should track game state correctly", () => {
    const state = game.getState();

    expect(state.currentPlayer).toBe(players[0]);
    expect(state.isGameOver).toBe(false);
    expect(state.winners).toHaveLength(0);
  });

  test("should detect game over condition", () => {
    // Remove all cards from a player
    const winner = players[0];
    while (winner.getCards().length > 0) {
      winner.removeCard(0);
    }

    expect(GameRules.isGameOver(game)).toBe(true);
    expect(GameRules.getWinner(players)).toBe(winner);
  });
});
