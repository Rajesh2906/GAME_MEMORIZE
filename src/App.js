import React, { useEffect, useState } from "react";
import "./App.css";
import apple from "./images/apple.png";
import pineApple from "./images/pineApple.png";
import mango from "./images/mango.png";
import pomogranate from "./images/pomogranate.png";
import papaya from "./images/papaya.png";
import carrot from "./images/carrot.png";

const imageList = [
  { id: 1, src: apple, flipped: false },
  { id: 2, src: pineApple, flipped: false },
  { id: 3, src: mango, flipped: false },
  { id: 4, src: pomogranate, flipped: false },
  { id: 5, src: carrot, flipped: false },
  { id: 6, src: papaya, flipped: false },
];

function App() {
  const [cards, setCards] = useState([...imageList, ...imageList]);
  const[click, setClick] = useState([]);

  const refreshCards = () => {
    setCards([...cards].map(card => ({ ...card, flipped: false })).sort(() => Math.random() - 0.5));
  };

  const flipCard = index => {
    if (click.length === 2) return;
    setCards(cards.map((card, i) => (i === index ? { ...card, flipped: !card.flipped } : card)));
    setClick([...click,index]);
  };

  useEffect(() =>{
    if (click.length === 2) {
      const [firstIndex, secondIndex] = click;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.src !== secondCard.src) {
        setTimeout(() => {
          setCards(cards.map((card, i) => (i === firstIndex || i === secondIndex ? { ...card, flipped: false } : card)));
          setClick([]);
        }, 700);
      } else {
        setClick([]);
      }
    }
    let isAllFlipped = true;
    cards.forEach(card => {
      if (!card.flipped){
        isAllFlipped = false;
      }
    });
    if(isAllFlipped){
      setTimeout(() => {
        refreshCards();
      },900);
    }
  },[click,cards]);

  return (
    <div className="App">
      <h1>MEMORIZE</h1>
      <button className="newGame" onClick={refreshCards}>New Game</button>
      <div className="imgGame">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => flipCard(index)}
          >
            <div className="card-inner">
              <div className="card-back">
                <img src={card.src} alt={`img-${index}`} />
              </div>
              <div className="card-front">
                Click
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
