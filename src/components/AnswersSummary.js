function AnswersSummary({ rightAnswer, userAnswer, i }) {
  return (
    <div className="explanation_container">
      {rightAnswer === userAnswer ? (
        <p className="got_it">
          Question {i + 1}: You've got it. Well done
        </p>
      ) : (
        <div className="explanation">
          <p>Question {i + 1}:</p>
          {userAnswer ? (
            <>
              <p>
                Wrong answer. Your answer was: "{userAnswer}
                "
              </p>
            </>
          ) : (
            <p>You didn't answer this question</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AnswersSummary;
