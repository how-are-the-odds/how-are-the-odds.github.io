import React from 'react';
import './Bubble.css'; // Assuming you have a CSS file for the bubble styles

interface BubbleProps {
  isCorrect: boolean | null;
  correctAnswer: string | null;
}

const Bubble: React.FC<BubbleProps> = ({ isCorrect, correctAnswer }) => {
  if (isCorrect === null) return null;

  return (
    <div className={`bubble ${isCorrect ? 'correct' : 'incorrect'}`}>
      {isCorrect ? 'Correct!' : `Incorrect (${correctAnswer})!`}
    </div>
  );
};

export default Bubble;