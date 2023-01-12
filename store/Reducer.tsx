import { SET_AUTH, SET_LOADING } from "./constants";
import { ActionGlobalContext, StateGlobalContext } from "./state.model";

const initialState: StateGlobalContext = {
  isAuth: false,
  isLoading: true,
};

const globalStateReducer = (
  state: StateGlobalContext,
  action: ActionGlobalContext
) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.data,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { initialState };
export default globalStateReducer;
