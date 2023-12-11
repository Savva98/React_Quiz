function NextButton({
  dispatch,
  answer,
  index,
  questionsLength,
}) {
  if (answer === null) return null;
  if (index < questionsLength - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn btn-ui"
      >
        Next one...
      </button>
    );

  if (index === questionsLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "FinishedQuiz" })}
      >
        Show results
      </button>
    );
}

export default NextButton;
