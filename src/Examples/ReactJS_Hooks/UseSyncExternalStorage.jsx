import {
  useCallback,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

function UseSyncExternalStoreExample1() {
  const windowGetData = {
    subscribe: useCallback((cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    }, []),
    widthGetData: { getSnapshot: useCallback(() => window.innerWidth, []) },
    heightGetData: { getSnapshot: useCallback(() => window.innerHeight, []) },
  };

  const windowWidth = useSyncExternalStore(
    windowGetData.subscribe,
    windowGetData.widthGetData.getSnapshot
  );
  const windowHeight = useSyncExternalStore(
    windowGetData.subscribe,
    windowGetData.heightGetData.getSnapshot
  );

  return (
    <>
      <p className="p-3 mx-3 text-gray-500">
        Window Width: <span className="px-3 font-bold">{windowWidth}px</span>
      </p>
      <p className="p-3 mx-3 text-gray-500">
        Window Height: <span className="px-3 font-bold">{windowHeight}px</span>
      </p>
    </>
  );
}

function UseSyncExternalStoreExample2() {
  const scrollX = useSyncExternalStore(
    useCallback((cb) => {
      window.addEventListener("scroll", cb);
      return () => window.removeEventListener("scroll", cb);
    }, []),
    () => window.scrollX
  );

  const scrollY = useSyncExternalStore(
    useCallback((cb) => {
      window.addEventListener("scroll", cb);
      return () => window.removeEventListener("scroll", cb);
    }, []),
    () => window.scrollY
  );

  return (
    <>
      <div className="w-full h-[200vh] relative">
        <div
          className={`w-[100px] h-[100px] absolute bg-green-300 right-0`}
          style={{
            top: `${scrollY}px`,
            willChange: 'top',
            transition: "top ease 0.1s 0.1s"
          }}
        ></div>
        <div className="static">
          <p className="p-3 mx-3 text-gray-500">
            Scroll X:
            <span className="px-3 font-bold">{scrollX}</span>
          </p>
          <p className="p-3 mx-3 text-gray-500">
            Scroll Y:
            <span className="px-3 font-bold">{scrollY}</span>
          </p>
        </div>
      </div>
    </>
  );
}


function UseSyncExternalStoreExample3 () {
  const getMousePoints = () => {
      const pointRef = useRef({x: 0, y: 0});

      return useSyncExternalStore(useCallback((cb) => {
        const pointHandle = (e) => {
          pointRef.current = {x: e.clientX, y: e.clientY};
          cb();
        };

        document.addEventListener("mousemove", pointHandle);
        return () => document.removeEventListener("mousemove", pointHandle);
      }, []), useCallback(() => pointRef.current, []));
  };

  const {x, y} = getMousePoints();

  return (
    <>
      <p className="p-3 mx-3 text-gray-500">
        Mouse X: <span className="px-3 font-bold">{x}px</span>
      </p>
      <p className="p-3 mx-3 text-gray-500">
        Mouse Y: <span className="px-3 font-bold">{y}px</span>
      </p>
      <div 
        className="w-[10px] h-[10px] absolute 
        bg-green-300 rounded-xl"
        style={{
          top: `${y}px`,
          left: `${x}px`,
          transform: "translate(-50%, -50%)",
          willChange: 'top, left',
          transition: "top ease-in-out 0.1s 0.1s, left ease-in-out 0.1s 0.1s"
        }}
      >
      </div>
    </>
  )
}

export default function TryUseSyncExternalStore() {
  return (
    <>
      <UseSyncExternalStoreExample1 />
      <UseSyncExternalStoreExample2 />
      <UseSyncExternalStoreExample3 />
    </>
  );
}
