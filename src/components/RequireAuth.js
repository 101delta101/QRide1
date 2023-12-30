import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;


{
  /*This requireauth component is used to wrap the all the pages that we want to protect.
  If the user is not logged in, then we will redirect the user to the login page from the current page.
  What is the need of useLocation here?
  We need to know the current location so that we can redirect the user to the login page from the current page.
 */
}
