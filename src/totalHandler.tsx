import { useEffect, useState } from "react";

export type DataState = [number, React.Dispatch<React.SetStateAction<number>>];

export function totalHandler(
  states: DataState[],
  isAdditive: boolean,
  updateParent: (total: number) => void) {
  const [total, setTotal] = useState<number>(isAdditive ? 0 : 1);

  const handle = (indexToUpdate: number) => (newValue: number) => {
    let operation = isAdditive
      ? (a: number, b: number) => a + b
      : (a: number, b: number) => a * b;

    if (Number.isNaN(newValue))
      newValue = 0;

    setTotal(
      states.reduce(
        (acc: number, [stateValue, setStateValue], i) => i === indexToUpdate
          ? (setStateValue(newValue), operation(acc, newValue))
          : operation(acc, stateValue),
        isAdditive ? 0 : 1
      )
    );
  };
  useEffect(() => updateParent(total));
  return [total, handle] as const;
}
