import { Color, getColorClass } from "./App";
import Select from 'react-select';
import { DataState, ExpSource, Option } from "./ExpSourcesComponent";
import TooltipComponent from "./TooltipComponent";

export function CreateRange(
  item: ExpSource,
  state: DataState,
  handler: (v: number) => void
) {
  return (
    <div className="row" key={item.Name}>
      <label>{item.Name}</label>
      <div className="range-wrapper">
        <label>{state[0].toFixed(2)}%</label>
        <input
          type="range"
          min={item.Options[0].value}
          max={item.Options[1].value}
          step={item.Options[2].value}
          value={state[0]}
          onChange={(event) => handler(event.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}
export function CreateDropDown(
  item: ExpSource,
  handler: (v: number) => void
) {
  return (
    <div className="row" key={item.Name}>
      <label>{item.Name}</label>
      <Select 
        className="select-wrapper"
        classNamePrefix={"select"}
        //styles={style}
        defaultValue={item.Options[0]} 
        isSearchable={false} 
        unstyled={true}  
        options={item.Options} 
        onChange={(newValue, _) => handler(newValue?.value ?? 0)} />
    </div>
  );
}
export function CreateToggle(
  item: ExpSource,
  state: DataState,
  handler: (v: number) => void
) {
  let checked = state[0] !== 0 ? true : false;
  return (
    <div className="row" key={item.Name}>
      <label>{item.Name}</label>
      <div className="checkbox-wrapper">
        <label>{state[0]}%</label>
        <div 
          className={`checkbox ${checked? "checked":""}`}
          onClick={() => handler(checked ? 0 : item.Options[0].value)}
        >
          <svg viewBox="-1 -2 6 7">
            <path d="M 0 2 L 1 4 L 4 0 L 0 0 L 4 4 L 0 4 L 4 0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function CreateInputField(
  item: ExpSource,
  state: DataState,
  handler: (v: number) => void
) {
  return (
    <div className="row" key={item.Name}>
      <label>{item.Name}</label>
      <div className="input-wrapper">
        <TooltipComponent
          text={item.Options.reduce(
            (acc: string, option: Option) =>
              `${acc}${option.label.padEnd(15)}${option.value === null ? "": `: ${option.value}`}\n`,
            ""
          )}
        />
        <input
          type="number"
          min={0}
          value={state[0]}
          onChange={(event) => handler(event.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}