import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useUpdateMutation } from "../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputStyle = "pl-4 pr-8 py-2 rounded";

  const dispatch = useDispatch();
  const [update] = useUpdateMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not Match");
    } else {
      try {
        const res = await update({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <form className="border-2 rounded-lg p-16 flex flex-col justify-center items-center gap-10">
      <h1>Profile</h1>
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
          placeholder="Update Password"
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
          Update
        </button>
      </div>
    </form>
  );
}

export default ProfilePage;
