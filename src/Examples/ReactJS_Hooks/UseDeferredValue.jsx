import { useDeferredValue, useEffect, useState } from "react"

function UseDeferredValueExample1 () {
  const [query, setQuery] = useState("");
  const [hasQuery, setHasQuery] = useState(false);
  const [job, setJob] = useState(false);
  const [loading, setLoading] = useState(false);
  const defferedValue = useDeferredValue(query);

  const inputAction = (e) => {
    setLoading(true);
    setJob(false);
    setQuery(e.target.value);

    setTimeout(() => {}, 0);
  };

  useEffect(() => {query == "" ? setHasQuery(false) : setHasQuery(true)}, [query]);

  useEffect(() => {
    const slowProcess = async () => {
      await new Promise(res => setTimeout(res, 3000));
      if (loading) setLoading(false);
      if (!job)  setJob(true);
    };
    slowProcess()
  }, [defferedValue]);

  return (
    <>
      <input 
        className="p-5 m-3 bg-gray-100 rounded-xl outline-none border-2
        border-blue-300 text-gray-700 text-sm"
        type="text" 
        value={query}
        onInput={inputAction}
      />
      {
        loading && job ? <p
          className="px-5 m-3 text-red-400 font-bold"
        >Loading...</p> : 
        !loading && job && hasQuery ? <p
          className="px-5 m-3 text-green-400 font-bold"
        >Done</p> : ""
      }
    </>
  ) 
}

export default function TryUseDeferredValue () {
  return (
    <>
      <UseDeferredValueExample1 />
    </>
  )
}