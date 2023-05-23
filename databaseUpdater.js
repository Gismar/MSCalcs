import MOBA_DATA  from "./data/monster-exp.json"                   assert { type: "json" };
import RGEM_DATA  from "./data/monster-exp-multiplier-reg.json"    assert { type: "json" };
import RBEM_DATA  from "./data/monster-exp-multiplier-reboot.json" assert { type: "json" };
import MUES_DATA  from "./data/multiplicative-exp-buff-data.json"  assert { type: "json" };
import ADES_DATA  from "./data/additive-exp-buff-data.json"        assert { type: "json" };
import BOES_DATA  from "./data/additive-exp-buff-data-extras.json" assert { type: "json" };
import PocketBase from "pocketbase";

// ID SUFFIXES FOR EASIER API USE
export const MOBA_IDSUFFIX = "monster_exp_";
export const RGEM_IDSUFFIX = "regul_multi_";
export const RBEM_IDSUFFIX = "rboot_multi_";
export const MUES_IDSUFFIX = "mul_exp_src_";
export const ADES_IDSUFFIX = "add_exp_src_";
export const BOES_IDSUFFIX = "bon_exp_src_";

// DATABASE NAMES TO REDUCE MAGIC STRINGS
export const MOBA_NAME = "monster_base_exp";
export const RGEM_NAME = "regular_multiplier";
export const RBEM_NAME = "reboot_multiplier";
export const MUES_NAME = "multiplicative_exp_sources";
export const ADES_NAME = "additive_exp_sources";
export const BOES_NAME = "bonus_exp_sources";

const UpdateFlag = {
  Base: 1 << 0,
  Reg: 1 << 1,
  Rbt: 1 << 2,
  MuES: 1 << 3,
  AdES: 1 << 4,
  BoES: 1 << 5,
};

async function Main() {
  const pb = new PocketBase("https://mscalc.fly.dev");
  let updateDB = 0;

  if (process.argv.includes("--all")) {
    updateDB |=
      UpdateFlag.Base |
      UpdateFlag.Reg  |
      UpdateFlag.Rbt  |
      UpdateFlag.MuES |
      UpdateFlag.AdES |
      UpdateFlag.BoES ;
  } else {
    updateDB |= process.argv.includes("--updtBase") ? UpdateFlag.Base : 0;
    updateDB |= process.argv.includes("--updtReg")  ? UpdateFlag.Reg  : 0;
    updateDB |= process.argv.includes("--updtRbt")  ? UpdateFlag.Rbt  : 0;
    updateDB |= process.argv.includes("--updtMuES") ? UpdateFlag.MuES : 0;
    updateDB |= process.argv.includes("--updtAdES") ? UpdateFlag.AdES : 0;
    updateDB |= process.argv.includes("--updtBoES") ? UpdateFlag.BoES : 0;
  }

  if (updateDB === 0) {
    console.log(
      "Invalid commands, use --all or: " +
        "--updtBase || --updtRbt  || --updtReg  || " +
        "--updtMuES || --updtAdES || --updtBoES"
    );
    return;
  }

  const email = process.argv[2];
  const password = process.argv[3];

  if (email === null || password === null) {
    console.log(
      "Invalid commands please provide email and password"
    );
    return;
  }

  await pb.admins.authWithPassword(email, password);
  const hasFlag = (a, b) => (a & b) !== 0;
  /* 
    Update the Exp Charts' Database
  */
  if (hasFlag(updateDB, UpdateFlag.Base))
    await UpdateExpChartDatabase(
      MOBA_IDSUFFIX,
      pb.collection(MOBA_NAME),
      MOBA_DATA
    );

  if (hasFlag(updateDB, UpdateFlag.Reg))
    await UpdateExpChartDatabase(
      RGEM_IDSUFFIX,
      pb.collection(RGEM_NAME),
      RGEM_DATA
    );

  if (hasFlag(updateDB, UpdateFlag.Rbt))
    await UpdateExpChartDatabase(
      RBEM_IDSUFFIX,
      pb.collection(RBEM_NAME),
      RBEM_DATA
    );
  /* 
    Update the Exp Sources' Database
  */
  if (hasFlag(updateDB, UpdateFlag.MuES))
    await UpdateExpSourceDatabase(
      MUES_IDSUFFIX,
      pb.collection(MUES_NAME),
      MUES_DATA
    );

  if (hasFlag(updateDB, UpdateFlag.AdES))
    await UpdateExpSourceDatabase(
      ADES_IDSUFFIX,
      pb.collection(ADES_NAME),
      ADES_DATA
    );

  if (hasFlag(updateDB, UpdateFlag.BoES))
    await UpdateExpSourceDatabase(
      BOES_IDSUFFIX,
      pb.collection(BOES_NAME),
      BOES_DATA
    );

  console.log("Done");
}

const format = (number) => number.toString().padStart(3, "0");

async function HandleUpdate(collection, id, item) {
  await collection
    .getOne(id)
    .then(() => collection.update(id, item))
    .catch(() => collection.create({ id: id, ...item }));
}

async function UpdateExpChartDatabase(suffix, collection, data) {
  for (let item of data) {
    const id = `${suffix}${format(item.level)}`;
    console.log(`Updating: ${id}`);
    await HandleUpdate(collection, id, item);
  }
}

async function UpdateExpSourceDatabase(suffix, collection, data) {
  for (let item of data) {
    const id = `${suffix}${item.id}`;
    console.log(`Updating: ${id}`);
    let temp = {"name": item.name, "type": item.type, "options": JSON.stringify(item.options)}
    await HandleUpdate(collection, id, temp);
  }
}

Main();