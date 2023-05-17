import { useRef, useState } from "react";
import "./tooltip-component.css";

interface Prop {
  text: string;
}

function TooltipComponent({ text }: Prop) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const showToolTip = () => setTimeout(() => setShow(true), 150);
  //prevents staying if user moves mouse in and out fast
  const hideToolTip = () => setTimeout(() => setShow(false), 100);
  const height = ref.current?.clientHeight || -100;
  return (
    <div className="tooltip-wrapper">
      <div
        className="hover"
        onMouseEnter={showToolTip}
        onMouseLeave={hideToolTip}
      >
        ?
      </div>
      <span
        className="tooltip"
        ref={ref}
        style={{
          opacity: show ? 1 : 0,
          top: `${-height - 10}px`,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default TooltipComponent;
