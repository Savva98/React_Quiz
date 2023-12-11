import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Error from "./Error";
import axios from "axios";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedQuiz from "./FinishedQuiz";
import Timer from "./Timer";
import Footer from "./Footer";
import Summary from "./Summary";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished', 'summary'
  status: "loading",
  index: 0,
  answer: null,
  scores: 0,
  highScore: 0,
  secondsRemaining: null,
  arrayOfAnswers: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataLoading":
      return { ...state, status: "loading" };
    case "activateTest":
      return {
        ...state,
        status: "active",
        secondsRemaining:
          state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const storedAnswer = question.options.at(
        action.payload
      );
      return {
        ...state,
        answer: action.payload,
        scores:
          action.payload === question.correctOption
            ? state.scores + question.points
            : state.scores,
        arrayOfAnswers: storedAnswer
          ? [...state.arrayOfAnswers, storedAnswer]
          : [...state.arrayOfAnswers],
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "FinishedQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.scores > state.highScore
            ? state.scores
            : state.highScore,
      };
    case "Summary":
      return {
        ...state,
        status: "summary",
      };
    case "Restart":
      return {
        ...state,
        status: "ready",
        answer: null,
        index: 0,
        scores: 0,
        secondsRemaining: null,
        arrayOfAnswers: [],
      };

    default:
      throw new Error("Can't make an action");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  const {
    questions,
    status,
    index,
    answer,
    scores,
    nextQuestion,
    highScore,
    secondsRemaining,
    arrayOfAnswers,
  } = state;
  const questionsLength = questions.length;
  const maximumPoints = questions.reduce(
    (curr, acc) => curr + acc.points,
    0
  );

  useEffect(function () {
    async function getQuestions() {
      try {
        dispatch({ type: "dataLoading" });
        const resp = await axios(
          `http://localhost:8000/questions`
        );
        const { data } = resp;
        dispatch({
          type: "dataRecieved",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionsLength={questionsLength}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionsLength={questionsLength}
              points={scores}
              maximumPoints={maximumPoints}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
              scores={scores}
              nextQuestion={nextQuestion}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionsLength={questionsLength}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedQuiz
            points={scores}
            maxPoints={maximumPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}

        {status === "summary" && (
          <Summary
            dispatch={dispatch}
            questions={questions}
            answersArr={arrayOfAnswers}
          />
        )}
      </Main>
    </div>
  );
}
