import {
  CreateInputField,
  CreateDropDown,
  CreateRange,
  CreateToggle,
} from "./inputCreators";
import { useState, memo } from "react";
import { getColorClass, Color } from "./Utilities";
import "./exp-sources-component.css";
import { totalHandler } from "./totalHandler";

interface props {
  data: ExpSource[];
  header: string;
  isAdditive: boolean;
  updateParent: (total: number) => void;
  color: Color;
}

export interface ExpSource {
  name: string;
  type: string;
  options: Option[];
}

export interface Option {
  value: number;
  label: string;
  className: string;
}


function ExpSourceComponent({
  data,
  header,
  isAdditive,
  updateParent,
  color,
}: props) {
  const states = data.map(() => useState(isAdditive ? 0 : 1));
  const [total, handle] = totalHandler(states, isAdditive, updateParent);

  return (
    <>
      <div className={`exp-source-wrapper ${getColorClass(color)}`}>
        <h2>{header}</h2>
        {data.map((item, i) => {
          switch (item.type) {
            case "dropdown":
              return CreateDropDown(item.name, item.options, handle(i));
            case "range":
              return CreateRange(item.name, item.options, states[i], handle(i));
            case "toggle":
              return CreateToggle(item.name, item.options, states[i], handle(i));
            case "input":
              return CreateInputField(item.name, item.options, states[i], handle(i));
            default:
              return <h3>Failed</h3>;
          }
        })}
      </div>
      <h3 className={`total ${getColorClass(color)}`}>
        Total {isAdditive ? `${total}%` : `${total.toFixed(2)}x`}
      </h3>
    </>
  );
}

export default memo(ExpSourceComponent);
