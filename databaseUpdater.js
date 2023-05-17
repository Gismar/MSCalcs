import monsterExpData from "./data/monster-exp.json" assert { type: "json" };
import regMultiData from "./data/monster-exp-multiplier-reg.json" assert { type: "json" };
import rbtMultiData from "./data/monster-exp-multiplier-reboot.json" assert { type: "json" };
import PocketBase from 'pocketbase';

// ID SUFFIXES FOR EASIER API USE
export const MonsterBaseIDSuffix = "monster_exp_";
export const RegMultiIDSuffix = "regul_multi_";
export const RBTMultiIDSuffix = "rboot_multi_";

async function Main() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const email = process.argv[2];
  const password = process.argv[3];

  let updateBase = process.argv.includes("--updateBase");
  let updateReg = process.argv.includes("--updateReg");
  let updateReboot = process.argv.includes("--updateReboot");
  if (!updateBase && !updateReg && !updateReboot) {
    updateBase = true;
    updateReg = true;
    updateReboot = true;
  }

  await pb.admins.authWithPassword(email, password);
  
  if (updateBase) await UpdateBaseDB(pb);
  if (updateReg) await UpdateRegMultiDB(pb);
  if (updateReboot) await UpdateRBTMultiDB(pb);
}

const format = (number) => number.toString().padStart(3, "0");

async function handle(collection, id, item) {
  await collection.getOne(id)
    .then(() => collection.update(id, item))
    .catch(() => collection.create({ "id": id, ...item }));
}

async function UpdateRBTMultiDB(pb) {
  for (let item of rbtMultiData) {
    const id = `${RBTMultiIDSuffix}${format(item.level)}`;
    console.log(`Updating: ${id}`);
    await handle(pb.collection('reboot_multiplier'), id, item);
  }
}

async function UpdateRegMultiDB(pb) {
  for (let item of regMultiData) {
    const id = `${RegMultiIDSuffix}${format(item.level)}`;
    console.log(`Updating: ${id}`);
    await handle(pb.collection('regular_multiplier'), id, item);
  }
}

async function UpdateBaseDB(pb) {
  for (let item of monsterExpData) {
    const id = `${MonsterBaseIDSuffix}${format(item.level)}`;
    console.log(`Updating: ${id}`);
    await handle(pb.collection('monster_base_exp'), id, item);
  }
}

await Main();