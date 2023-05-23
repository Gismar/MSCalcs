import { useState, useEffect, memo } from "react";
import ExpSourceComponent, { ExpSource } from "./ExpSourcesComponent";
import PocketBase from "pocketbase";
import * as DataBases from "../databaseUpdater";
import { getExpSourceData, formatDecimal, Color } from "./Utilities";
import RuneSourceComponent from "./RuneSourceComponent";
import BurningSourceComponent from "./BurningSourceComponent";

function App() {
  const [multiplicative, setMultiplicative] = useState(1);
  const [additive, setAdditive] = useState(0);
  const [extras, setExtras] = useState(0);
  const [rune, setRune] = useState(40);
  const [mues, setMues] = useState<ExpSource[]>([]);
  const [ades, setAdes] = useState<ExpSource[]>([]);
  const [boes, setBoes] = useState<ExpSource[]>([]);
  const [ready, setReady] = useState(false);

  const pb = new PocketBase("https://mscalc.fly.dev");
  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const muesResult = await getExpSourceData(
        pb.collection(DataBases.MUES_NAME)
      );
      setMues(muesResult);

      const adesResult = await getExpSourceData(
        pb.collection(DataBases.ADES_NAME)
      );
      setAdes(adesResult);

      const boesResult = await getExpSourceData(
        pb.collection(DataBases.BOES_NAME)
      );
      setBoes(boesResult);

      setReady(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if (!ready) return <h2>Loading...</h2>;

  return (
    <>
      <div className="sources">
        <ExpSourceComponent
          data={mues}
          header="Multiplicative Stacking Exp Bonuses"
          isAdditive={false}
          updateParent={setMultiplicative}
          color={Color.primary}
        />
        <ExpSourceComponent
          data={ades}
          header="Additive Stacking Exp Bonuses"
          isAdditive={true}
          updateParent={setAdditive}
          color={Color.secondary}
        />
        <RuneSourceComponent
          header="Rune Exp Bonus"
          updateParent={setRune}
          color={Color.tertiary}
        />
        <ExpSourceComponent
          data={boes}
          header="Extras Additive Stacking Exp Bonuses"
          isAdditive={true}
          updateParent={setExtras}
          color={Color.quaternary}
        />
        <BurningSourceComponent
          header="Burning Stages"
          updateParent={() => {}}
          color={Color.primary}
        />
      </div>
      <div className="monsterInfo">
        <h1>
          Total: {formatDecimal(multiplicative * 100 + additive + extras + rune)}%
        </h1>
      </div>
    </>
  );
}

export default memo(App);
