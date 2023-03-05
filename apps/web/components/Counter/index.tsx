import { animate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  duration?: number;
  format?: (num: number) => string;
  className?: string;
  from: number;
  to: number;
}

function Counter({
  from,
  to,
  className,
  format = (num: number) => `${num.toFixed()}`,
  duration = 0.1,
}: Props) {
  const [innerForm, setInnerFrom] = useState(from);
  const nodeRef = useRef<any>();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(innerForm, to, {
      duration,
      onUpdate(value) {
        node.textContent = format(value);
        node.className = "text-gray-300 transform-gpu translate-y-2";
      },
      onComplete: () => {
        node.className = className;
        setInnerFrom(to);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span className={className} ref={nodeRef} />;
}

export default Counter;
