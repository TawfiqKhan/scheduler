import { useState } from 'react';

const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => {
        let newArr = [...prev]
        newArr[newArr.length - 1] = newMode
        return newArr
      })
    }
    setHistory(prev => [...prev, newMode])
  }
  function back() {
    let lastItem = history[history.length - 1]
    if (history.length === 1) {
      return history;
    }
    setHistory(prevHistory => prevHistory.filter(item => item !== lastItem))
  }
  return { mode: history[history.length - 1], transition, back }
}

export { useVisualMode }
