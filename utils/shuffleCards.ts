// utils/shuffleCards.ts
import {Card} from "@/types/types";
  

  const images = [
    '/images/card1.png',
    '/images/card2.png',
    '/images/card3.png',
    '/images/card4.png',
    '/images/card5.png',
    '/images/card6.png',
    '/images/card7.png',
    '/images/card8.png',
  ];
  
  export function shuffleCards(): Card[] {
    const cards = images.flatMap((image, index) => [
      { id: index * 2 + 1, image, flipped: false, matched: false },
      { id: index * 2 + 2, image, flipped: false, matched: false },
    ]);
  
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  
    return cards;
  }
  
