import { Deck, Card } from "../index.js";

describe("Deck", () => {
  let deck: Deck;

  beforeEach(() => {
    deck = Deck.createStandardDeck();
  });

  test("should create standard deck with correct number of cards", () => {
    expect(deck.getSize()).toBe(108); // Standard Uno deck size
  });

  test("should shuffle cards", () => {
    const originalOrder = deck.draw(deck.getSize());
    deck = Deck.createStandardDeck();
    deck.shuffle();
    const shuffledOrder = deck.draw(deck.getSize());

    // Check if orders are different (very unlikely to be same)
    expect(originalOrder).not.toEqual(shuffledOrder);
  });

  test("should draw correct number of cards", () => {
    const drawnCards = deck.draw(5);
    expect(drawnCards).toHaveLength(5);
    expect(deck.getSize()).toBe(103); // 108 - 5
  });

  test("should throw error when drawing too many cards", () => {
    expect(() => deck.draw(109)).toThrow("Not enough cards in deck");
  });
});
