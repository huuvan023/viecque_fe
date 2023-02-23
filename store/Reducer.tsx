import { CreateFeedModel } from "@Models/index";
import { SET_CREATE_FEED, SET_LOADING, SET_ROLE } from "./constants";
import { ActionGlobalContext, StateGlobalContext } from "./state.model";

const initialState: StateGlobalContext = {
  isLoading: true,
  createFeed: {} as CreateFeedModel,
  role: "",
};

const globalStateReducer = (
  state: StateGlobalContext,
  action: ActionGlobalContext
) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    case SET_CREATE_FEED:
      return {
        ...state,
        createFeed: action.data,
      };
    case SET_ROLE:
      return {
        ...state,
        role: action.data,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { initialState };
export default globalStateReducer;
