import { useState } from "react";
import "./App.css";

interface Prop {
  data: ExpSources[];
  header: string;
  isAdditive: boolean;
}

export interface ExpSources {
  Name: string;
  Options: Option[];
}

export interface Option {
  value: number;
  display: string;
}

function App({ data, header, isAdditive }: Prop) {
  const states = data.map(() => useState(1));

  const [total, setTotal] = useState(1);

  // Workaround the asyncronous useState, also not expecting large states
  const handle = (index: number, value: number) => {
    let operation = isAdditive
      ? (a: number, b: number) => a + b
      : (a: number, b: number) => a * b;

    let total = states.reduce(
      (acc: number, [stateValue, setStateValue], i) =>
        i === index
          ? (setStateValue(value), operation(acc, value))
          : operation(acc, stateValue),
      isAdditive ? 0 : 1
    );

    setTotal(total);
  };
  return (
    <>
      <div className="multiplicative-grid-wrapper">
        <h2>{header}</h2>
        {data.map((item, i) => (
          <div className="row" key={item.Name}>
            <label>{item.Name}</label>
            <select
              value={states[i][0]}
              onChange={(event) => handle(i, Number(event.target.value))}
            >
              {item.Options?.length === 0 
                ? <option value={isAdditive ? 0 : 1} key={`${i}-FAILED`}>Empty Data</option>
                : item.Options?.map((subItem, j) => (
                    <option value={subItem.value} key={`${i}-${j}-${subItem.display}`}>{subItem.display}</option>
                  ))
              }
            </select>
          </div>
        ))}
      </div>
      <div className="total">Total {total.toFixed(2)}x</div>
    </>
  );
}

export default App;
