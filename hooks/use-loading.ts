import GlobalStateContext from "@Store/Context";
import { SET_LOADING } from "@Store/constants";
import { useContext } from "react";
export function useLoading() {
  const [state, dispatch] = useContext(GlobalStateContext);

  const handleLoading = (isLoading: boolean) => {
    dispatch({
      type: SET_LOADING,
      data: isLoading,
    });
  };

  function setLoading(isLoading: boolean) {
    handleLoading(isLoading);
  }
  return {
    setLoading,
    isLoading: state.isLoading,
  };
}
