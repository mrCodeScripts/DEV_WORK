import { memo, useInsertionEffect, useState } from "react";

function TryUseInsertionEffectExample1() {
  const [colorState, newColorState] = useState("green");

  console.log(colorState);

  const MemoizedComponent = memo(({ bgColor }) => {
    useInsertionEffect(() => {
      const styleTag = document.createElement("style");
      styleTag.textContent = `.box {
                padding: 10px;
                border-radius: 10px;
                background-color: ${bgColor};
                border: 1px solid blue;
            }`;
      document.head.appendChild(styleTag);
      return () => document.head.removeChild(styleTag);
    }, [bgColor]);
    return <div className="box">This is a box</div>;
  });

  return (
    <>
      <MemoizedComponent bgColor={colorState} />
      <button 
        onClick={() => {colorState === "green" ? newColorState("red") : newColorState("green")}}
        className="p-3 m-3 bg-blue-300 rounded-xl outline-none border-2 border-blue-600"
      >
        Toggle Color State
      </button>
    </>
  );
}

export default function TryUseInsertionEffect() {
  return (
    <>
      <TryUseInsertionEffectExample1 />
    </>
  );
}
