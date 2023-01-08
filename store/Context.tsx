import { ActionGlobalContext, StateGlobalContext } from "./state.model";
import { createContext } from "react";
import { initialState } from "./Reducer";

const GlobalStateContext = createContext<
  [StateGlobalContext, React.Dispatch<ActionGlobalContext>]
>([initialState, () => initialState]);

export default GlobalStateContext;
