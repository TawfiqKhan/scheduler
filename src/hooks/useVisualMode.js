import { useState } from 'react';

const useVisualMode = (initialMode) => {
  // const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode) {
    setHistory(prev => [...prev, newMode])
    // return setMode(newMode)
  }
  function back(){
    let lastItem = history[history.length - 1]
    if(history.length === 1) {
      return history;
    }
    setHistory(prevHistory => prevHistory.filter(item => item !==lastItem))
  }
  return { mode: history[history.length - 1], transition, back }
}

export { useVisualMode }