import { SET_DATA } from "./constants";
import { ActionGlobalContext, StateGlobalContext } from "./state.model";

const initialState: StateGlobalContext = {
  data1: "dsads",
};

const globalStateReducer = (
  state: StateGlobalContext,
  action: ActionGlobalContext
) => {
  // console.log(state);

  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data1: action.data,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { initialState };
export default globalStateReducer;
