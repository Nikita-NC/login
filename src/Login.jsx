import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const URL = `/login`
      const response = await axios.post(URL, { email, password });
      await axios.post(URL, {email, password}).then(result => {
        console.log(result, "rpsonse from proimise")
        toast.success(response.data.message)
      })
      localStorage.setItem("userData", JSON.stringify(response.data.data.token));
      toast.success(response.data.message)
      if(response && response.data && response.data.success){
        navigate("/frontpage");
      }
      
    } catch (error) {
      toast.error(error.message);
      console.log("error",error);
    }
  };

  return (
    <>
      <div className="flex h-screen ">
        <div className="w-1/2 flex justify-center items-center bg-white rounded-l-lg">
          <div className="max-w-sm w-full p-6 rounded-lg">
            <div className="space-y-2 mb-4">
              <h1 className="font-bold text-2xl text-slate-800 text-left">
                Log in to your Account
              </h1>
              <p className="text-left opacity-55 text-sm">
                Welcome back! select a method to log in
              </p>
              <div className="flex justify-between ">
                <div className="relative">
                  <button className="border-2 py-1 px-10 rounded-lg">
                    Google
                  </button>
                  <div className="absolute top-[12px] px-4">
                    <FcGoogle />
                  </div>
                </div>
                <div className="relative">
                  <button className="border-2 py-1 px-10 rounded-lg">
                    Facebook
                  </button>
                  <div className="absolute top-[12px] px-4 text-blue-700">
                    <FaFacebook />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <hr className="flex-1 border-[1.5px] rounded" />
              <p>or continue with email</p>
              <hr className="flex-1 border-[1.5px] rounded" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="w-full mb-2 p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute top-[13px] px-2  opacity-55">
                  <HiOutlineMail />
                </div>
              </div>

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  className="w-full mb-4 p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-[13px] right-0 px-3  flex items-center text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <div className="absolute top-[13px] px-2  opacity-55">
                  <MdLockOutline />
                </div>
              </div>
              {/* {error && <p className="text-red-500">{error}</p>} */}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="text-blue-900 hover:text-blue-700 font-bold py-2 px-4 rounded"
                  onClick={() => navigate("/")}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2 bg-blue-900 flex justify-center items-center rounded-r-lg">
          <div className="w-1/2 pt-1/2 rounded-full bg-gray-500 bg-opacity-50"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
