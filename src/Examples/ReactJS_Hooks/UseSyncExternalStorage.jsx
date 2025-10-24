import { useCallback, useSyncExternalStore } from "react"

function UseSyncExternalStoreExample1 () {
  const windowGetData = {
    subscribe: useCallback(cb => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    }, []),
    widthGetData: {getSnapshot: useCallback(() => window.innerWidth, [])},
    heightGetData: {getSnapshot: useCallback(() => window.innerHeight, [])},
  };

  const windowWidth = useSyncExternalStore( windowGetData.subscribe, windowGetData.widthGetData.getSnapshot);
  const windowHeight = useSyncExternalStore( windowGetData.subscribe, windowGetData.heightGetData.getSnapshot);

  return (
    <>
      <p className="p-3 mx-3 text-gray-500">
        Window Width: <span className="px-3 font-bold">{windowWidth}px</span>
      </p>
      <p className="p-3 mx-3 text-gray-500">
        Window Height: <span className="px-3 font-bold">{windowHeight}px</span>
      </p>
    </>
  )
}

export default function TryUseSyncExternalStore () {
  return (
    <>
      <UseSyncExternalStoreExample1 />
    </>
  )
}