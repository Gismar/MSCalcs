import { useState } from "react";
import "./exp-sources-component.css";
import { CreateDropDown, CreateRange, CreateToggle } from "./InputHelpers";

interface Prop {
  data: ExpSource[];
  header: string;
  isAdditive: boolean;
  updateParent: (total: number) => void;
}

export interface ExpSource {
  Name: string;
  Type: string;
  Options: Option[];
}

export interface Option {
  value: number;
  display: string;
}

export type DataState = [number, React.Dispatch<React.SetStateAction<number>>]

function ExpSourceComponent({ data, header, isAdditive, updateParent }: Prop) {
  const states = data.map(() => useState(isAdditive ? 0 : 1));
  const [total, handle] = totalHandler(states, isAdditive, updateParent);

  return (
    <>
      <div className="multiplicative-grid-wrapper">
        <h2>{header}</h2>
        {data.map((item, i) => {
          switch (item.Type) {
            case "Dropdown":
              return CreateDropDown(item, i, states[i], handle);
            case "Range":
              return CreateRange(item, i, states[i], handle);
            case "Toggle":
              return CreateToggle(item, i, states[i], handle)
            default:
              return <h3>Failed</h3>
          }
        })}
      </div>
      <div className="total">Total {isAdditive ? `${total}%` : `${total.toFixed(2)}x`}</div>
    </>
  );
}

function totalHandler (states: DataState[], isAdditive: boolean, updateParent: (total: number) => void){
  const [total, setTotal] = useState<number>(isAdditive ? 0 : 1);

  const handle = (indexToUpdate: number, newValue: number) => {
    let operation = isAdditive
      ? (a: number, b: number) => a + b
      : (a: number, b: number) => a * b;
    
    setTotal(states.reduce(
      (acc: number, [stateValue, setStateValue], i) =>
        i === indexToUpdate
          ? (setStateValue(newValue), operation(acc, newValue))
          : operation(acc, stateValue),
      isAdditive ? 0 : 1
    ));
  }
  updateParent(total);
  return [total, handle] as const;
}

export default ExpSourceComponent;
