import { Chat } from "./Chat";
import { SocketProvider } from "./SocketProvider";
import { TryUseState } from "./Examples/ReactJS_Hooks/UseState";
import { TryUseEffect } from "./Examples/ReactJS_Hooks/UseEffect";
import { TryUseContext } from "./Examples/ReactJS_Hooks/UseContext_CreateContext";
import {
  TaskManager,
  TestUseReducer,
} from "./Examples/ReactJS_Hooks/UseReducer";
import TryUseMemo from "./Examples/ReactJS_Hooks/UseMemo";
import UserApp from "./Examples/ReactJS_Hooks/Lazy";
import { TryUseActionState } from "./Examples/ReactJS_Hooks/UseActionState";
import { TheCart } from "./Examples/ReactJS_Hooks/addToCartComponent/addtoCart";
import TryReactMemo from "./Examples/ReactJS_Hooks/ReactMemo";
import TryTaskManager from "./Examples/ReactJS_Hooks/taskManagerComponent/taskManagerApp";
import TryUseOptimistic from "./Examples/ReactJS_Hooks/UseOptimistic";
import TryUseCallback from "./Examples/ReactJS_Hooks/UseCallback";
import TryUseRef from "./Examples/ReactJS_Hooks/UseRef";
import SnakeGame from "./Examples/ReactJS_Hooks/snakeGameComponent/snakeGame";
import TryForwardRef from "./Examples/ReactJS_Hooks/ForwardRef";
import TryImperativeHandle from "./Examples/ReactJS_Hooks/UseImperativeHandle";
import TryUseLayoutEffect from "./Examples/ReactJS_Hooks/UseLayoutEffect";
import TryUsedID from "./Examples/ReactJS_Hooks/UseId";

export default function App() {
  return (
    <>
      {/* <SocketProvider>
      <Chat></Chat>
      </SocketProvider>
      <TryUseState />
      <TryUseEffect />
      <TryUseContext />
      <TaskManager />
      <TestUseReducer></TestUseReducer> */}
      {/* <UseMemoExample></UseMemoExample> */}
      {/* <UserApp></UserApp> */}
      {/* <TryUseActionState /> */}
      {/* <TheCart /> */}
      {/* <TryReactMemo /> */}
      {/* <TryUseMemo /> */}
      {/* <TryTaskManager /> */}
      {/* <TryUseOptimistic /> */}
      {/* <TryUseCallback /> */}
      {/* <TryUseRef /> */}
      {/* <SnakeGame /> */}
      {/* <TryForwardRef /> */}
      {/* <TryImperativeHandle /> */}
      {/* <TryUseLayoutEffect /> */}
      <TryUsedID />
    </>
  );
}
