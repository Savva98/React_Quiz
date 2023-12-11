function StartScreen({ questionsLength, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react Quiz!</h2>
      <h3>
        {questionsLength ? questionsLength : ""} questions
        to test you React knowledge
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "activateTest" })}
      >
        Start quiz
      </button>
    </div>
  );
}

export default StartScreen;
