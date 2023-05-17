import { useEffect, useState } from "react";
import "./exp-sources-component.css";
import { CreateInputField, CreateDropDown, CreateRange, CreateToggle } from "./InputHelpers";
import { Color, getColorClass } from "./App";

interface props {
  data: ExpSource[];
  header: string;
  isAdditive: boolean;
  updateParent: (total: number) => void;
  color: Color;
}

export interface ExpSource {
  Name: string;
  Type: string;
  Options: Option[];
}

export interface Option {
  value: number;
  label: string;
  className: string;
}

export type DataState = [number, React.Dispatch<React.SetStateAction<number>>]

function ExpSourceComponent({ data, header, isAdditive, updateParent, color }: props) {
  const states = data.map(() => useState(isAdditive ? 0 : 1));
  const [total, handle] = totalHandler(states, isAdditive, updateParent);

  return (
    <>
      <div className={`exp-source-wrapper ${getColorClass(color)}`}>
        <h2>{header}</h2>
        {data.map((item, i) => {
          switch (item.Type) {
            case "Dropdown":
              return CreateDropDown(item, handle(i));
            case "Range":
              return CreateRange(item, states[i], handle(i));
            case "Toggle":
              return CreateToggle(item, states[i], handle(i));
            case "Input":
              return CreateInputField(item, states[i], handle(i));
            default:
              return <h3>Failed</h3>
          }
        })}
      </div>
      <h3 className={`total ${getColorClass(color)}`}>Total {isAdditive ? `${total}%` : `${total.toFixed(2)}x`}</h3>
    </>
  );
}

function totalHandler (states: DataState[], isAdditive: boolean, updateParent: (total: number) => void){
  const [total, setTotal] = useState<number>(isAdditive ? 0 : 1);

  const handle = (indexToUpdate: number) => (newValue: number) => {
    let operation = isAdditive
      ? (a: number, b: number) => a + b
      : (a: number, b: number) => a * b;
    
    if (Number.isNaN(newValue))
      newValue = 0;

    setTotal(states.reduce(
      (acc: number, [stateValue, setStateValue], i) =>
        i === indexToUpdate
          ? (setStateValue(newValue), operation(acc, newValue))
          : operation(acc, stateValue),
      isAdditive ? 0 : 1
    ));
  }
  useEffect(() => updateParent(total));
  return [total, handle] as const;
}

export default ExpSourceComponent;
