import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { selectIsAuthenticated } from "../features/auth/authSelectors";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const loginUser = (username, password) => {
    dispatch(login({ username, password }));
  };

  return { isAuthenticated, loginUser };
};
