import { GlobalStyle } from './style';

import AnswerFromGpt from './components/AnswerFromGpt';
import ResumeInfoExtraction from './components/ResumeInfoExtraction';
function App() {
  return (
    <div className="App">
      <div>简历信息提取尝试</div>
<ResumeInfoExtraction></ResumeInfoExtraction>    
      {/* <div>1</div>
      <AnswerFromGpt></AnswerFromGpt> */}
      
    </div>
  );
}

export default App;
