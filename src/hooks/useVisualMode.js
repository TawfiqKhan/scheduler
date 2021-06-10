import {useState} from 'react';

 const useVisualMode=  (param) =>{
  const [mode, setMode] = useState(param)

   function transition(newMode){
    return setMode(newMode)
   }
  return {mode, transition}
}

export {useVisualMode}