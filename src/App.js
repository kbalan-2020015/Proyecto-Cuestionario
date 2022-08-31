import questions  from "./questions";
import './estilos/styles.css';
import { useState} from 'react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);

  const HandleAnswerSubmit = (isCorrect, e) => {
    if(isCorrect) setScore(score + 1);

    e.target.classList.add(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if(currentQuestion === questions.length - 1){
        setIsFinished(true);
      }
      else{
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1000);
  }

  if(isFinished) return(
    <div className="app">
      <div className="game__over">
        <span> {" "} Obtuviste { score } correctas de {questions.length} {" "} </span>

        <button className="button__finish" onClick={() => window.location.href="/"} > {" "} Volver a jugar {" "}</button>
        <button className="button__finish" onClick={() => {
          setIsFinished(false);
          setAnswerShown(true);
          setCurrentQuestion(0);
        }} >Ver respuestas</button>
      </div>
    </div>
  )

  if(answerShown) return (
    <div className="app">
      <div className="app">
      <div className="left">
        <div className="question__number">
          <span>Pregunta { currentQuestion + 1 }</span> / { questions.length }
        </div>

        <div className="question__title"> { questions[ currentQuestion ].title } </div>
      </div>

      <div className="right">
        {questions[currentQuestion].options.filter((option) => option.isCorrect)[0].answer}
        <button className="button__finish" onClick={() => {
        if(currentQuestion === questions.length - 1){
          window.location.href = "/";
        }
        else{
          setCurrentQuestion(currentQuestion + 1);
        }
      }}>
        Continuar
      </button>
      </div>

    </div>
    </div>
  )

  return (
    <div className="app">
      <div className="left">
        <div className="question__number">
          <span>Pregunta { currentQuestion + 1 }</span> / { questions.length }
        </div>

        <div className="question__title"> { questions[ currentQuestion ].title } </div>
      </div>

      <div className="right">
        { questions[currentQuestion].options.map((answer) => (
          <button className="button" key={answer.answer} onClick={(e) => HandleAnswerSubmit(answer.isCorrect, e)}> {answer.answer} </button>
        )) }
      </div>
    </div>
  );
}

export default App;
