import React, { useCallback, useEffect, useState } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === lettersLeft[0]) {
        if (lettersLeft.length === 1) {
          onFinish();
        } else {
          setMistake(false);
          setLettersLeft(lettersLeft.slice(1));
        }
      } else {
        setMistake(true);
        onMistake();
      }
    },
    [lettersLeft, onFinish],
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('keyup', handleKeyUp);
      return () => document.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleKeyUp, active]);

  return (
    <div className={!mistake ? 'wordbox' : 'wordbox wordbox--mistake'}>
      {lettersLeft}
    </div>
  );
};

export default Wordbox;
