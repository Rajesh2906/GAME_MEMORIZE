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
  const [click, setClick] = useState([]);
  const [count, setCount] = useState(0);
  const [displayPopUp, setDisplayPopUp] = useState({
    displayPopUp: false,
    count: 0,
  });

  const refreshCards = () => {
    setCards(
      [...cards]
        .map((card) => ({ ...card, flipped: false }))
        .sort(() => Math.random() - 0.5)
    );
    setCount(0);
    setDisplayPopUp({displayPopUp: false, count:0});
  };

  const flipCard = (index) => {
    if (click.length === 2) return;
    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, flipped: !card.flipped } : card
      )
    );
    setClick([...click, index]);
  };

  useEffect(() => {
    if (click.length === 2) {
      const [firstIndex, secondIndex] = click;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.src !== secondCard.src) {
        setTimeout(() => {
          setCards(
            cards.map((card, i) =>
              i === firstIndex || i === secondIndex
                ? { ...card, flipped: false }
                : card
            )
          );
          setClick([]);
        }, 700);
      } else {
        setClick([]);
      }
      setCount(count + 1);
    }
    let isAllFlipped = true;
    cards.forEach((card) => {
      if (!card.flipped) {
        isAllFlipped = false;
      }
    });
    if (isAllFlipped) {
      setDisplayPopUp({ displayPopUp: true, count: count });
      setTimeout(() => {
        setCards(
          [...cards]
            .map((card) => ({ ...card, flipped: false }))
            .sort(() => Math.random() - 0.5)
        );
        setCount(0);
      }, 900);
    }
  }, [click, cards]);

  return (
    <div className="App">
      <h1>MEMORIZE</h1>
      <button className="newGame" onClick={refreshCards}>
        New Game
      </button>
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
              <div className="card-front"><p>Click!</p></div>
            </div>
          </div>
        ))}
      </div>
      <div className="turns">No of turns : {count}</div>
      {displayPopUp?.displayPopUp && (
        <div className="popUp">
          Congratulations You did it! You took {displayPopUp?.count} turns
          <button className="newGame" onClick={refreshCards}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
