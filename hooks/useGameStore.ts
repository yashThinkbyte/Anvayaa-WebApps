// hooks/useGameStore.ts
import { create } from 'zustand';
import { shuffleCards } from '@/utils/shuffleCards';
import { GameState } from '@/types/types'; // Import the types
// import { console } from 'inspector';



export const useGameStore = create<GameState>((set, get) => ({
  cards: shuffleCards(),  // Initializes shuffled cards
  flippedCards: [],
  matchedCards: [],
  currentFlippedCard: -1,
  
  flipCard: (id: number) => {
    const { cards, flippedCards, matchedCards } = get();
    const newFlippedCard = cards.find(card => card.id === id)
    if (newFlippedCard && !matchedCards.includes(id)) {
      
      set({
        cards: cards.map(card =>
          card.id === newFlippedCard.id
            ? { ...card, flipped: true }  // Flip this card
            : card
        )
      });

      const newFlippedCards = [...flippedCards, newFlippedCard];

      if (newFlippedCards.length === 2) {
        console.log(" second flip");
        const [firstCard, secondCard] = newFlippedCards;
        if (firstCard.image === secondCard.image) {
          set({
            matchedCards: [...matchedCards, firstCard.id, secondCard.id],
            // cards: cards.map(card => card.id === firstCard.id || card.id === secondCard.id 
            //   ? { ...card, matched: true } : card),
          });
        } else {
          setTimeout(() => {
            const { cards } = get();  // Get the current cards from the store
            set({
              cards: cards.map(card => 
                card.id === firstCard.id || card.id === secondCard.id
                  ? { ...card, flipped: false }  // Flip the card back
                  : card
              )
            });
          }, 1000);
        }
        set({ flippedCards: []});
      } else {
        set({
          cards: cards.map(card =>
            card.id === newFlippedCard.id
              ? { ...card, flipped: true }  // Flip this card
              : card
          ),
          flippedCards: newFlippedCards,  // Add this card to flipped cards
        });
      }
    }
    
  },
  
  resetGame: () => {
    set({ cards: shuffleCards(), flippedCards: [], matchedCards: [] });
  },
}));
