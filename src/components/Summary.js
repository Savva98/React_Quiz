import AnswersSummary from "./AnswersSummary";

function Summary({ questions, answersArr, dispatch }) {
  if (answersArr.length < 5)
    return (
      <div className="no_answers">
        <p>
          Sorry you haven't answered enough questions. Try
          one more time!
        </p>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "Restart" })}
        >
          Start again.
        </button>
      </div>
    );
  return (
    <>
      <div className="summary_container">
        {questions.map((question, i) => (
          <AnswersSummary
            rightAnswer={question.options.at(
              question.correctOption
            )}
            userAnswer={answersArr.at(i)}
            key={question.question}
            i={i}
          />
        ))}
      </div>
      <button
        className="btn btn-ui summary_belong"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default Summary;
