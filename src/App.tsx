import { useState } from "react";
import ExpSourceComponent, { ExpSource } from "./ExpSourcesComponent";
import multiplicativeData from "../data/multiplicative-exp-buff-data.json";
import additiveData from "../data/additive-exp-buff-data.json"


function App() {
  let [multiplicative, setMultiplicative] = useState(1);
  let [additive, setAdditive] = useState(1);

  return (
    <>
      <ExpSourceComponent
      data={multiplicativeData as ExpSource[]}
      header="Multiplicative Stacking Exp Bonuses"
      isAdditive={false}
      updateParent={setMultiplicative}
    />
    <ExpSourceComponent
      data={additiveData as ExpSource[]}
      header="Additive Stacking Exp Bonuses"
      isAdditive={true}
      updateParent={setAdditive}
    />
    <h1>Total: {multiplicative * 100 + additive}%</h1>
    </>
  );
}

export default App;
