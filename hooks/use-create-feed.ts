import { CreateFeedModel } from "./../models/user/feeds.model";
import { SET_CREATE_FEED } from "./../store/constants";
import GlobalStateContext from "@Store/Context";
import { useContext } from "react";
export function useCreateFeed() {
  const [state, dispatch] = useContext(GlobalStateContext);

  function setCreateFeed(createfeedData: CreateFeedModel) {
    dispatch({
      type: SET_CREATE_FEED,
      data: createfeedData,
    });
  }
  return {
    setCreateFeed,
    createFeed: state.createFeed,
  };
}
