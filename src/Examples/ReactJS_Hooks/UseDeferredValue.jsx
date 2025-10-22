import { useDeferredValue, useEffect, useState } from "react"

function UseDefferedValueExample1 () {
  const [query, setQuery] = useState("");
  const [job, setJob] = useState(false);
  const [loading, setLoading] = useState(false);
  const defferedValue = useDeferredValue(query);

  const inputAction = (e) => {
    if (!loading) setLoading(true);
    if (job) setJob(false);
    setQuery(e.target.value);
  };

  useEffect(() => {
    // simulate server fetching
    const slowProcess = async () => {
      await new Promise(res => setTimeout(res, 9000));
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
          className="text-red-400 font-bold"
        >Loading...</p> : 
        !loading && job ? <p
          className="text-green-400 font-bold"
        >Done</p> : ""
      }
    </>
  ) 
}

export default function TryUseDeferredValue () {
  return (
    <>
      <UseDefferedValueExample1 />
    </>
  )
}