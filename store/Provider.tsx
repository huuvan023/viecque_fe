import React, { useReducer } from "react";
import GlobalStateContext from "./Context";
import globalStateReducer, { initialState } from "./Reducer";
interface Props {
  children: React.ReactNode;
}
const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
