/* eslint-disable no-unused-vars */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useLoginMutation } from "../redux/slices/userApiSlice";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputStyle = "pl-4 pr-8 py-2 rounded";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Success");
      navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <form className="border-2 rounded-lg p-16 flex flex-col justify-center items-center gap-10">
      <h1>Login</h1>
      <div className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative flex">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute h-full right-2 mt-2">
            {showPassword ? (
              <Visibility
                color="action"
                fontSize="small"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <VisibilityOff
                color="action"
                fontSize="small"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <button
          className="w-full font-medium border-2 rounded p-2 hover:text-gray-900 hover:bg-white"
          onClick={handleSubmit}
        >
          Login
        </button>
        <Link
          to="/signup"
          className="w-full bg-blue-800 p-2 text-center rounded-lg text-xs"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}

export default LoginPage;
