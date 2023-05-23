import Select from 'react-select';
import TooltipComponent from "./TooltipComponent";
import { Option } from "./ExpSourcesComponent";
import { DataState } from './totalHandler';

export function CreateRange(
  name: string,
  options: Option[],
  state: DataState,
  handler: (v: number) => void
) {
  return (
    <div className="row" key={name}>
      <label>{name}</label>
      <div className="range-wrapper">
        <label>{state[0].toFixed(2)}%</label>
        <input
          type="range"
          min={options[0].value}
          max={options[1].value}
          step={options[2].value}
          value={state[0]}
          onChange={(event) => handler(event.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}
export function CreateDropDown(
  name: string,
  options: Option[],
  handler: (v: number) => void
) {
  return (
    <div className="row" key={name}>
      <label>{name}</label>
      <Select 
        className="select-wrapper"
        classNamePrefix={"select"}
        //styles={style}
        defaultValue={options[0]} 
        isSearchable={false} 
        unstyled={true}  
        options={options} 
        onChange={(newValue, _) => handler(newValue?.value ?? 0)} />
    </div>
  );
}
export function CreateToggle(
  name: string,
  options: Option[],
  state: DataState,
  handler: (v: number) => void
) {
  let checked = state[0] !== 0 ? true : false;
  return (
    <div className="row" key={name}>
      <label>{name}</label>
      <div className="checkbox-wrapper">
        <label>{state[0]}%</label>
        <div 
          className={`checkbox ${checked? "checked":""}`}
          onClick={() => handler(checked ? 0 : options[0].value)}
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
  name: string,
  options: Option[],
  state: DataState,
  handler: (v: number) => void,
  min = 0,
  max = 99999
) {
  return (
    <div className="row" key={name}>
      <label>{name}</label>
      <div className="input-wrapper">
        <TooltipComponent
          text={options.reduce(
            (acc: string, option: Option) =>
              `${acc}${option.label.padEnd(15)}${option.value === null ? "": `: ${option.value}`}\n`,
            ""
          )}
        />
        <input
          className="input-range"
          type="number"
          min={min}
          maxLength={10}
          value={Math.min(state[0], max)}
          onChange={(event) => handler(Math.min(event.target.valueAsNumber, 99999))}
        />
      </div>
    </div>
  );
}