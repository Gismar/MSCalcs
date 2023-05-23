import { useState, memo, useEffect } from "react";
import { CreateDropDown, CreateToggle } from "./inputCreators";
import { Color, formatDecimal, getColorClass } from "./Utilities";
import "./exp-sources-component.css";


interface props {
  header: string;
  updateParent: (total: number) => void;
  color: Color;
}

const RUNE_PERSISTENCE = [
  { "className": "child", "value": 1, "label": "None (0%)" },
  { "className": "child", "value": 1.3, "label": "Lv. 1 (+30%)" },
  { "className": "child", "value": 1.5, "label": "Lv. 2 (+50%)" },
  { "className": "child", "value": 1.7, "label": "Lv. 3 (+70%)" }
];

const RUNE_EXP = [
  { "className": "child", "value": 200, "label": "100%" },
  { "className": "child", "value": 250, "label": "150%" },
  { "className": "child", "value": 300, "label": "200%" }
];

const RUNE_COOLDOWN = [
  { "className": "child", "value": 15, "label": "15 min." },
  { "className": "child", "value": 10, "label": "10 min." }
];

const RUNE_NODE = [{ "className": "child", "value": 20, "label": "on" }];

function RuneSourceComponent ({header, updateParent, color}: props) {
  const [duration, setDuration] = useState(1.0);
  const [exp, setExp] = useState(100);
  const [cooldown, setCooldown] = useState(15);
  const [node, setNode] = useState(0);
  const [total, setTotal] = useState(40);

  const handleTotal = ({
    newDur = duration,
    newExp = exp,
    newCD = cooldown,
    newNode = node,
  }: {
    newDur?: number;
    newExp?: number;
    newCD?: number;
    newNode?: number;
  } = {}): void => {
    const uptime = (180 * newDur) / (newCD * 60);
    const nodeUptime = newNode / (newCD * 60);
    const newTotal = uptime * newExp + nodeUptime * 50;
    setTotal(newTotal);
    updateParent(newTotal);
  };

  useEffect(() => {
    handleTotal();
  }, [duration, exp, cooldown, node])

  return (
    <>
      <div className={`exp-source-wrapper ${getColorClass(color)}`}>
        <h2>{header}</h2>
        {CreateDropDown("Rune Persistance", RUNE_PERSISTENCE, setDuration)}
        {CreateDropDown("Rune Exp", RUNE_EXP, setExp)}
        {CreateDropDown("Rune Cooldown", RUNE_COOLDOWN, setCooldown)}
        {CreateToggle("Rune-EXP I Node", RUNE_NODE, [node, setNode], setNode)}
      </div>
      <h3 className={`total ${getColorClass(color)}`}>
        Average Per Hour: {formatDecimal(total)}%
      </h3>
    </>
  );
}

export default memo(RuneSourceComponent);