import { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../redux/slices/userApiSlice";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutApi().unwrap();
      dispatch(logout());
      setIsOpened(false);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header className="w-full h-16 flex items-center justify-between p-4 bg-slate-500">
      <div className="ml-10">
        <Link to={userInfo ? "/profile" : "/"}>
          <h1 className="font-semibold h-full">Authen</h1>
        </Link>
      </div>
      {userInfo ? (
        <div className="dropdown mr-20">
          <h1
            className={`dropdown-hero ${isOpened ? "active" : ""}`}
            onClick={() => setIsOpened(!isOpened)}
          >
            {userInfo.name}
          </h1>
          <div className="dropdown-menu">
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
            <button onClick={handleLogout} className="dropdown-item">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          {location.pathname === "/" && (
            <Link to="/login" className="mr-20 p-1 px-4 border-2 rounded-lg">
              <button>Login</button>
            </Link>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
