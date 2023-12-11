import Options from "./Options";

function Question({ questions, dispatch, answer }) {
  const { question, options, correctOption } = questions;
  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        correctOption={correctOption}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Question;
