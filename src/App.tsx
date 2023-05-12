import { useState } from "react";
import ExpSourceComponent, { ExpSource } from "./ExpSourcesComponent";
import multiplicativeData from "../data/multiplicative-exp-buff-data.json";
import additiveData from "../data/additive-exp-buff-data.json";
import extrasData from "../data/additive-exp-buff-data-extras.json"

export enum Color {
  primary,
  secondary,
  tertiary,
  quadriary
}


function App() {
  let [multiplicative, setMultiplicative] = useState(1);
  let [additive, setAdditive] = useState(0);
  let [extras, setExtras] = useState(0);
  return (
    <>
      <ExpSourceComponent
        data={multiplicativeData as ExpSource[]}
        header="Multiplicative Stacking Exp Bonuses"
        isAdditive={false}
        updateParent={setMultiplicative}
        color={Color.primary}
      />
      <ExpSourceComponent
        data={additiveData as ExpSource[]}
        header="Additive Stacking Exp Bonuses"
        isAdditive={true}
        updateParent={setAdditive}
        color={Color.secondary}
      />
      <ExpSourceComponent
        data={extrasData as ExpSource[]}
        header="Extras Additive Stacking Exp Bonuses"
        isAdditive={true}
        updateParent={setExtras}
        color={Color.primary}
      />
      <h1>Total: {format(multiplicative * 100 + additive + extras)}%</h1>
    </>
  );
}

function format (num: number):string {
  if (num % 1 !== 0)
    return num.toFixed(2)
  return num.toFixed(0);
}

export function getColorClass (color: Color) {
  switch (color){
    case Color.primary: return "primary";
    case Color.secondary: return "secondary";
    case Color.tertiary: return "tertiary";
    case Color.quadriary: return "quadriary";
  }
}
export default App;