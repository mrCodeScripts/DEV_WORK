import { useId } from "react"

function UseIdExample1 () {
  const username_input_id = useId();
  const pwd_input_id = useId();

  return (
    <>
      <form>
        <label htmlFor={username_input_id}>Username:</label>
        <input type="text" id={username_input_id} placeholder="Username..." />
        <label htmlFor={pwd_input_id}>Password:</label>
        <input type="password" id={pwd_input_id} placeholder="Username..." />
      </form>
    </>
  )
}

function Tabs({ tabs }) {
  const id = useId();
  return (
    <div>
      <ul role="tablist">
        {tabs.map((tab, idx) => {
          const tabId = `${id}-tab-${idx}`;
          const panelId = `${id}-panel-${idx}`;
          return (
            <li key={idx}>
              <button id={tabId} aria-controls={panelId} role="tab">
                {tab.title}
              </button>
              <div id={panelId} aria-labelledby={tabId} role="tabpanel">
                {tab.content}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function TryUsedID () {
  return (
    <>
      <Tabs tabs={[
        {title: "Shit", content: "Hello shit!"},
        {title: "Shit", content: "Hello shit!"},
        {title: "Shit", content: "Hello shit!"},
      ]} />
    </>
  )
}