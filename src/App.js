"use strict"
import { GlobalStyle } from './style';

// import AnswerFromGpt from './components/AnswerFromGpt';
// import ResumeInfoExtraction from './components/ResumeInfoExtraction';
import fiberStart from './components/LearnReact/fiber'
import { useEffect, useRef } from 'react';
function App() {
  const isFirst = useRef(true)
  useEffect(() => {
    if (isFirst.current) {
      fiberStart()
      isFirst.current = false
      
    }
    setTimeout(() => {
      isFirst.current = true
    }, 300)
    
  },[])
  
  return (
    <div className="App">
      {/* <div>简历信息提取尝试</div> */}
    {/* <ResumeInfoExtraction></ResumeInfoExtraction>     */}
      {/* <div>1</div>
      <AnswerFromGpt></AnswerFromGpt> */}
      
    </div>
  );
}

export default App;
