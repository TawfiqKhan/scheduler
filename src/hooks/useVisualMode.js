import { useState } from 'react';

const useVisualMode = (initialMode) => {
  // const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if (replace) {
      // setHistory(prev => {[...prev, prev[0] = "third"]})
      setHistory(prev => {
        let newArr = [...prev]
        newArr[newArr.length - 1] = newMode
        console.log("After SetHistory----", history)
        return newArr
      })
    }
    setHistory(prev => [...prev, newMode])
    // return setMode(newMode)
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

//First, Second, Third, Fourth
