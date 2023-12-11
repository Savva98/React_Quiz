import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  // if (action.type === "Decrease")
  //   return { ...state, count: state.count - 1 };
  // if (action.type === "Increase")
  //   return { ...state, count: state.count + 1 };
  // if (action.type === "Set")
  //   return { ...state, count: action.payload };
  // if (action.type === "SetStep")
  //   return { ...state, step: action.payload };
  // if (action.type === "Reset") return action.payload;
  switch (action.type) {
    case "Decrease":
      return { ...state, count: state.count - state.step };
    case "Increase":
      return { ...state, count: state.count + state.step };
    case "Set":
      return { ...state, count: action.payload };
    case "SetStep":
      return { ...state, step: action.payload };
    case "Reset":
      return initialState;
    default:
      throw new Error("Something went wrong");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "Decrease" });
  };

  const inc = function () {
    dispatch({ type: "Increase" });
  };

  const defineCount = function (e) {
    dispatch({
      type: "Set",
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e) {
    dispatch({
      type: "SetStep",
      payload: Number(e.target.value),
    });
  };

  const reset = function () {
    dispatch({ type: "Reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
