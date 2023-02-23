import GlobalStateContext from "@Store/Context";
import { SET_ROLE } from "@Store/constants";
import { useContext } from "react";
export function useRole() {
  const [state, dispatch] = useContext(GlobalStateContext);

  const handleRole = (role: string) => {
    dispatch({
      type: SET_ROLE,
      data: role,
    });
  };

  function setRole(role: string) {
    handleRole(role);
  }
  return {
    setRole,
    isRole: state.role,
  };
}
