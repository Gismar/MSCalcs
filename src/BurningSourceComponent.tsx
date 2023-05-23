import { memo, useEffect, useState } from "react";
import { CreateInputField } from "./inputCreators";
import { Color, getColorClass } from "./Utilities";
import { CreateDropDown } from "./inputCreators";
import "./exp-sources-component.css";

interface props {
  header:string
  updateParent: (value: number) => void;
  color: Color;
}
const CASTS = [
  { className: "child", value: 0, label: "No Extra Casts" },
  { className: "child", value: 1, label: "1 Extra Cast" },
  { className: "child", value: 3, label: "3 Extra Casts" },
];

function BurningSourceComponent({ header, updateParent, color }: props) {
  const [initial, setInital] = useState(100);
  const [casts, setCasts] = useState(0);
  const [total, setTotal] = useState(85);
  const [stages, setStages] = useState([100, 90, 80, 70]);

  const handleTotal = ({
    newInitial = initial,
    newCasts = casts,
  }: {
    newInitial?: number;
    newCasts?: number;
  } = {}): void => {
    const getNext = (value: number) => Math.max(newInitial - value, 0);
    let newStages:number[] = [];
    switch (newCasts) {
      case 0:
        newStages = [newInitial, getNext(10), getNext(20), getNext(30)];
        break;
      case 1:
        if (newInitial >= 90)
          newStages = [newInitial, getNext(10), 100, 90];
        else
          newStages = [newInitial, 100, 90, 80];
        break;
      case 3:
        newStages = [newInitial, 100, 100, 100];
        break;
    }
    const newTotal = newStages.reduce((acc, curr) => acc + curr) / 4;
    setStages(newStages);
    setTotal(newTotal);
    updateParent(newTotal);
  };

  useEffect(() => {
    handleTotal();
  }, [initial, casts]);
  return (
    <>
      <div className={`exp-source-wrapper ${getColorClass(color)}`}>
        <h2>{header}</h2>
        {CreateInputField("Inital Burning %", [], [initial, setInital], setInital, 0, 100)}
        {CreateDropDown("Extra Casts", CASTS, setCasts)}
        <div className="row">
          <label>{stages[0]}</label>
          <label>{stages[1]}</label>
        </div>
        <div className="row">
          <label>{stages[2]}</label>
          <label>{stages[3]}</label>
        </div>
      </div>
      <h3 className={`total ${getColorClass(color)}`}>
        Average Burning: {total}%
      </h3>
    </>
  );
}

export default memo(BurningSourceComponent);
