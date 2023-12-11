function FinishedQuiz({
  points,
  maxPoints,
  highScore,
  dispatch,
}) {
  const percentage = points / (maxPoints / 100);

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of{" "}
        {maxPoints} this is {Math.ceil(percentage)} %
      </p>
      <p className="highscore">
        (Hightscore: {highScore} points)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart Quiz?
      </button>
      <button
        className="btn btn-ui summary"
        onClick={() => dispatch({ type: "Summary" })}
      >
        Summary
      </button>
    </>
  );
}

export default FinishedQuiz;
