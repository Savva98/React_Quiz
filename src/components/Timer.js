import { useEffect, useState } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const [second, setSecond] = useState(secondsRemaining);
  const mins = Math.floor(second / 60);
  const seconds = second % 60;

  useEffect(
    function () {
      if (second === 0)
        return dispatch({ type: "FinishedQuiz" });
      const id = setInterval(function () {
        setSecond((second) => second - 1);
      }, 1000);
      return function () {
        return clearInterval(id);
      };
    },
    [setSecond, second, dispatch]
  );

  return (
    <div className="timer">
      {mins >= 10 ? mins : `0${mins}`}:
      {seconds >= 10 ? seconds : `0${seconds}`}
    </div>
  );
}

export default Timer;
