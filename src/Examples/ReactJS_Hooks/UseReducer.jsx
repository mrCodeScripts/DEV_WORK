import { useReducer, useEffect } from "react";

// SIMPLE USEREDUCER FUNCTION

function useReducerDispatcher(state, action) {
  switch (action.type) {
    case "decrement":
      return state - action.payload;
    case "increment":
      return state + action.payload;
    default:
      return state;
  }
}

export function TestUseReducer() {
  const initialState = 0;
  const [state, dispatch] = useReducer(useReducerDispatcher, initialState);

  return (
    <>
      <p className="text-xl font-bold text-center">{state}</p>
      <div className="w-full flex flex-row justify-center">
        <button
          className="p-3 border-2 border-red-500 text-sm font-bold text-white bg-red-300 rounded-xl m-3"
          onClick={() => dispatch({ type: "decrement", payload: 1 })}
        >
          Decrement
        </button>
        <button
          className="p-3 border-2 border-green-500 text-sm font-bold text-white bg-green-300 rounded-xl m-3"
          onClick={() => dispatch({ type: "increment", payload: 1 })}
        >
          Increment
        </button>
      </div>
    </>
  );
}

// TASK MANAGER USING USEREDUCER HOOK
// 1. Define actions
const ACTIONS = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  REMOVE_TASK: "remove-task",
  CLEAR_COMPLETED: "clear-completed",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// 2. Reducer function
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOADING:
      return { ...state, loading: true, error: null };
    case ACTIONS.SUCCESS:
      return { ...state, loading: false, tasks: action.payload };

    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };

    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.completed),
      };

    default:
      return state;
  }
}

// 3. Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// 4. Component using useReducer
export function TaskManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fake async fetch
  useEffect(() => {
    dispatch({ type: ACTIONS.LOADING });
    setTimeout(() => {
      // simulate success
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: [
          {
            id: 1,
            text: "Learn useReducer",
            completed: true,
          },
          {
            id: 2,
            text: "Build a project",
            completed: false,
          },
        ],
      });
    }, 1000);
  }, []);

  const addTask = (text) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: text });
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Task Manager (useReducer)</h1>

      {state.loading && <p>Loading...</p>}
      {state.error && <p className="text-red-500">{state.error}</p>}

      <input
        type="text"
        placeholder="Add new task"
        className="border p-2 rounded w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />

      <ul className="space-y-2">
        {state.tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_TASK,
                  payload: task.id,
                })
              }
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.REMOVE_TASK,
                  payload: task.id,
                })
              }
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {state.tasks.some((t) => t.completed) && (
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}

/*
-------------------------------------------------------------
🧠 COMPLETE DESCRIPTION OF useReducer()
-------------------------------------------------------------

-------------------------------------------------------------
🔹 PURPOSE:
-------------------------------------------------------------
- useReducer() is a React hook for managing state logic in a more
  predictable and centralized way than useState.
- It’s perfect when you have:
    • complex state objects
    • multiple sub-values
    • logic that depends on the type of action
- Instead of calling setState directly, you dispatch **actions** with
  a type and optional payload, and a reducer function decides how
  the state should change.

-------------------------------------------------------------
🔹 SYNTAX:
-------------------------------------------------------------
const [state, dispatch] = useReducer(reducerFunction, initialState);

- `state` → current state object/value
- `dispatch` → function used to send an action to the reducer
- `reducerFunction(state, action)` → returns a new state based on action

-------------------------------------------------------------
🔹 REDUCER FUNCTION:
-------------------------------------------------------------
function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "setName":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

-------------------------------------------------------------
🔹 ACTION OBJECT:
-------------------------------------------------------------
- Must have a `type` property (string)
- Optional `payload` property (any value you want to pass)
Example:
dispatch({ type: "increment" });
dispatch({ type: "setName", payload: "Boss" });

-------------------------------------------------------------
🔹 HOW IT WORKS:
-------------------------------------------------------------
1️⃣ You call dispatch({ type: "actionType", payload? })
2️⃣ React calls your reducer(state, action)
3️⃣ Reducer returns a new state object
4️⃣ React updates the component state and triggers a re-render

-------------------------------------------------------------
🔹 WHY USE useReducer OVER useState:
-------------------------------------------------------------
- Great for complex state objects with multiple values
- All state updates are centralized in **one reducer function**
- Makes code more predictable and easier to debug
- Works nicely with context providers for global state

-------------------------------------------------------------
🔹 EXAMPLE:

const initialState = { count: 0, name: "Boss" };

function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "setName":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <p>Name: {state.name}</p>

      <button onClick={() => dispatch({ type: "increment" })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "setName", payload: "Alpha Boss" })}>
        Change Name
      </button>
    </>
  );
}

-------------------------------------------------------------
💡 TL;DR SUMMARY:
-------------------------------------------------------------
- useReducer = advanced useState for **complex state management**
- State updates go through a **centralized reducer function**
- dispatch() sends action objects to the reducer
- Reducer uses **type + payload** to compute new state
- Perfect for multi-value objects, predictable state transitions, and large apps
-------------------------------------------------------------
*/
