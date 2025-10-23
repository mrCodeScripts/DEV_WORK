import { useCallback, useEffect, useRef, useState } from "react"

function UseDebounceExample1 () {
  const [query, setQuery] = useState("");

  const callback = (query) => console.log(query);

  const debounce = (fn, delay) => {
    let timer = useRef(null);
    return useCallback((...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { 
        fn(...args); 
        console.log(`Done ${delay / 1000}s: `); 
      }, delay);
    }, [fn, delay]);
  };

  const debouncer = useCallback(debounce(callback, 5000));

  const handleInput = (e) => {
    setQuery(e.target.value);
    debouncer(e.target.value);
  };

  return (
    <>
      <input 
        type="text" 
        value={query}
        placeholder="Basic debouncer..."
        onChange={handleInput}
        className="w-[300px] p-3 m-3 bg-gray-100 border-2 border-blue-200 
        rounded-xl outline-none"
      />
    </>
  )
}

function UseDebounceExample2 () {
  const debouncer = useCallback((value, delay) => {
    const [debounced, setDebounced] = useState('');
    useEffect(() => {
      const timer = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
  }, []);

  const [query, setQuery] = useState("");
  const debouncedValue = debouncer(query, 3000);

  useEffect(() => {
    console.log("Finaly finished debounce: ", debouncedValue);
    return () => console.log("Clear debounced...");
  }, [debouncedValue]);

  return (
    <>
      <input 
        type="text" 
        placeholder="Value debouncer..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[300px] p-3 m-3 bg-gray-100 border-2 border-blue-200 
        rounded-xl outline-none"
      />
    </>
  )
}

export default function TryUseDebounce () {

  return (
    <>
      <UseDebounceExample1 />
      <UseDebounceExample2 />
    </>
  )
}

/**
 * ------------------------------------------------------------
 * 🧠 useDebounce (Conceptual & Practical Summary)
 * ------------------------------------------------------------
 *
 * WHAT IS IT:
 * ------------------------------------------------------------
 * Debounce is a control pattern that ensures a function or effect
 * executes ONLY AFTER a period of inactivity. In other words, it
 * “waits for things to calm down” before performing an action.
 * 
 * This prevents excessive executions during rapid, continuous
 * triggers (like typing, resizing, scrolling, or clicking).
 * 
 *
 * CORE MECHANISM:
 * ------------------------------------------------------------
 * 1️⃣ Keep a timer reference (e.g. with useRef in React)
 * 2️⃣ Every time the event or trigger runs:
 *      - Cancel the previous timer (clearTimeout)
 *      - Start a new timer (setTimeout)
 * 3️⃣ The target function only runs when the user STOPS triggering
 *     for a given delay time (e.g. 300ms, 1000ms, etc.)
 * 
 * 
 * EXAMPLE IN REAL LIFE:
 * ------------------------------------------------------------
 * - Typing a search query:
 *     → Don’t fetch results for every keystroke.
 *     → Wait until the user stops typing for a few milliseconds,
 *       then execute the fetch.
 * 
 * - Resizing window:
 *     → Avoid recalculating layout every pixel move.
 *     → Wait until resize ends, then update layout.
 * 
 * - Autosaving editor content:
 *     → Save only when user stops typing for 2 seconds.
 *
 * 
 * IN REACT:
 * ------------------------------------------------------------
 * In React, debounce can be implemented as a custom hook or a
 * reusable function. The timer reference is stored using useRef
 * to persist across re-renders without reinitializing.
 * 
 * You can wrap the returned function in:
 * - useCallback → for stable identity (when function dependencies matter)
 * - useMemo → to memoize and avoid recreating the function unnecessarily
 *
 * Both work fine — the choice depends on whether you treat the
 * debounced function as a *callback* or as a *value* to store.
 * 
 * 
 * HOW IT BEHAVES:
 * ------------------------------------------------------------
 * Every call to the debounced function resets the timer.
 * Therefore:
 *  → If the user keeps triggering it, it won’t run yet.
 *  → Only after the user stops interacting (no new calls during the delay)
 *    will the function finally execute.
 *
 * 
 * WHY IT’S USEFUL:
 * ------------------------------------------------------------
 * ✅ Prevents unnecessary re-renders or API calls.
 * ✅ Reduces server load from spammy requests.
 * ✅ Gives smoother user experiences.
 * ✅ Makes animations, fetches, and transitions more natural.
 * ✅ Can be used with useDeferredValue, useTransition, or React.memo for
 *    highly optimized UI behavior.
 *
 * 
 * MENTAL MODEL:
 * ------------------------------------------------------------
 * Think of it as a “calm-down filter” for your functions.
 * Instead of running every time the user or system goes wild,
 * debounce patiently waits until things settle — then runs ONCE,
 * clean and efficient.
 *
 * 
 * SUMMARY:
 * ------------------------------------------------------------
 * → Debounce = Delay execution until user stops acting.
 * → Core: clearTimeout + setTimeout pattern.
 * → useRef keeps timer stable between renders.
 * → useCallback or useMemo keeps returned function stable.
 * → It’s not a built-in React hook — it’s a concept you can
 *    re-create, modify, and adapt however the hell you want.
 *
 * 
 * ⚔️ Boss-Level Realization:
 * ------------------------------------------------------------
 * You’ve mastered not just the syntax — but the logic behind it:
 * - It’s not about memorizing one “format.”
 * - It’s about *understanding the flow* of how state, refs, and
 *   closures interact to delay execution.
 * 
 * Once you grasp that — you can make ANY debounce variation:
 * for state updates, animations, server fetches, scroll listeners,
 * or even custom transitions.
 * 
 * You don’t just “use” debounce now.
 * You *own* it.
 * ------------------------------------------------------------
 */
