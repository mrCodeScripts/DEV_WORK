import { useEffect, useState } from "react"

function UseEffectOnValueChange () {
  const [count, newCount] = useState(0);

  useEffect(() => {
    console.log("Incremented");
    const prev = count;

    return () => console.log("Run this before incrementing");
  }, [count]);

  return (
    <>
      <button
        type="button"
        className="px-10 py-2 m-3 bg-green-500 rounded-xl text-white font-bold"
        onClick={() => newCount(prev => prev += 1)}
      >
        Click This!
      </button>
      <span>
        {count}
      </span>
    </>
  )
}

export function TryUseEffect () {
  return (
    <>
      <UseEffectOnValueChange />
    </>
  )
}

/*

-------------------------------------------------------------
🧠 COMPLETE DESCRIPTION OF useEffect()
-------------------------------------------------------------

useEffect(() => {
  // 🧩 The "effect" function:
  // This block of code runs AFTER React renders the component.
  // It's where you put side effects — code that affects things 
  // outside the React render cycle, such as:
  //   - Fetching data from APIs
  //   - Subscribing to sockets, events, or listeners
  //   - Updating the document title
  //   - Setting timers or intervals
  //   - DOM manipulations

  // Example:
  // socket.connect();
  // fetchData();

  return () => {
    // 🧹 CLEANUP FUNCTION:
    // Runs BEFORE the effect re-runs, or when the component unmounts.
    // Used to remove event listeners, clear intervals, disconnect sockets, etc.
    // Think of this as “undo whatever I set up above.”
    
    // Example:
    // socket.disconnect();
    // clearInterval(timer);
  };
}, [dependencyToWatch]);
-------------------------------------------------------------

🔍 DEPENDENCY EXPLANATION:

- [] → Empty array means it runs ONCE after the first render (mount).
  Perfect for fetching data or connecting sockets when the component starts.

- [dep] → Runs the effect AGAIN every time `dep` changes.
  Example: watching a prop or state value to refetch or recalculate data.

- No dependencies → Runs after *every render* (usually bad for performance).

-------------------------------------------------------------

🧩 WHEN EACH PART RUNS:
1️⃣ Component renders for the first time.
2️⃣ useEffect callback runs (the “effect” part).
3️⃣ If dependencies change → cleanup runs, then effect runs again.
4️⃣ If component unmounts → cleanup runs one last time.

-------------------------------------------------------------

⚙️ PRACTICAL EXAMPLES:

// Example 1: Run once (on mount)
useEffect(() => {
  console.log("Component mounted!");
  return () => console.log("Component unmounted!");
}, []);

// Example 2: Watch a state variable
useEffect(() => {
  console.log("Count changed!");
}, [count]);

// Example 3: Socket.io example
useEffect(() => {
  socket.connect();
  socket.on("message", handleMessage);

  return () => {
    socket.off("message", handleMessage);
    socket.disconnect();
  };
}, [userId]); // reconnects socket when userId changes

-------------------------------------------------------------
💡 TL;DR SUMMARY:
- Runs *after render*.
- Reacts to *changes in dependencies*.
- Has *optional cleanup* for unmounting.
- Perfect for side effects, sockets, APIs, or data fetching.
-------------------------------------------------------------

 */
 