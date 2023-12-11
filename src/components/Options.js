function Options({
  options,
  answer,
  dispatch,
  correctOption,
}) {
  return (
    <div className="options">
      {options.map((option, i) =>
        answer === null ? (
          <button
            className="btn btn-option"
            onClick={() =>
              dispatch({ type: "newAnswer", payload: i })
            }
            key={option}
          >
            {option}
          </button>
        ) : (
          <button
            className={`btn btn-option ${
              i === answer ? "answer" : ""
            } ${i === correctOption ? "correct" : "wrong"}`}
            key={option}
            disabled={true}
          >
            {option}
          </button>
        )
      )}
    </div>
  );
}

export default Options;
