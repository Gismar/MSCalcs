import React, {useState} from 'react';
import "./tooltip-component.css"

interface Prop {
  text: string
}

function TooltipComponent({ text }: Prop) {
  const [show, setShow] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const showToolTip = (event:React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTimeout(() => {
      setShow(true);
      setLeft(event.clientX - rect.left);
      setTop(event.clientY - rect.top);
    }, 100);
  }
  const hideToolTip = () => setShow(false);
  return (
    <div className="tooltip-wrapper" onMouseEnter={showToolTip} onMouseLeave={hideToolTip}>
      <div className="hover">?</div>
      {show && (
        <div className="tooltip" style={{
          top:top,
          left:left,
          opacity: show ? 1 : 0
        }}>
          {text}
        </div>
      )}
    </div>
  );
}

export default TooltipComponent