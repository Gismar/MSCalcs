import { ExpSource, DataState } from "./ExpSourcesComponent";

export function CreateDropDown(
  item: ExpSource,
  index: number,
  state: DataState,
  handler: (v: number, i: number) => void) {
  return (
    <div className="row" key={item.Name}>
      <label>{item.Name}</label>
      <select
        value={state[0]}
        onChange={(event) => handler(index, Number(event.target.value))}
      >
        {item.Options?.map((subItem, j) => (
          <option
            value={subItem.value}
            key={`${index}-${j}-${subItem.display}`}
          >
            {subItem.display}
          </option>
        ))}
      </select>
    </div>
  );
}
export function CreateRange(
  item: ExpSource,
  index: number,
  state: DataState,
  handler: (v: number, i: number) => void) {
  return (
    <div className="row" key={item.Name}>
      <label>{item.Name}</label>
      <div className="range-wrapper">
        <label>{state[0]}%</label>
        <input
          type="range"
          min={item.Options[0].value}
          max={item.Options[1].value}
          step={item.Options[2].value}
          value={state[0]}
          onChange={(event) => handler(index, event.target.valueAsNumber)} />
      </div>
    </div>
  );
}
export function CreateToggle(
  item: ExpSource,
  index: number,
  state: DataState,
  handler: (v: number, i: number) => void) {
  return (
    <div className="row" key={item.Name}>
      <label>{item.Name}</label>
      <div className="range-wrapper">
        <label>{state[0]}%</label>
        <input
          type="checkbox"
          value={state[0]}
          onChange={(event) => handler(index, event.target.checked ? item.Options[0].value : 0)} />
      </div>
    </div>
  );
}
