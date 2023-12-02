import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputStyle = "pl-4 pr-8 py-2 rounded";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not Match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Registered Successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <form className="border-2 rounded-lg p-16 flex flex-col justify-center items-center gap-10">
      <h1>Signup</h1>
      <div className="flex flex-col gap-4">
        <input
          type="name"
          name="name"
          placeholder="Enter Name"
          className={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="relative flex">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className={inputStyle}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Signup
        </button>
        <Link
          to="/login"
          className="w-full bg-blue-800 p-2 text-center rounded-lg text-xs"
        >
          Already Exist
        </Link>
      </div>
    </form>
  );
}

export default SignupPage;
