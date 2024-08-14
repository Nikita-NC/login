import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!data.firstName || !data.lastName || !data.address || !data.contactNumber || !data.email || !data.password || !data.confirmPassword) {
        setError("All fields are required");
        return;
      }
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

    const URL = `/register`;

    try {
      const response = await axios.post(URL, data);
      await axios.post(URL, data).then(result => {
        console.log(result, "rpsonse from proimise")
      })
      console.log("response", response);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          firstName: "",
          lastName: "",
          address: "",
          contactNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log("error",error)
      
    }
    // console.log("setdata",data);
  };

  return (
    <form
      className="form max-w-lg mx-auto p-6 br-white rounded-lg shadow-md space-y-4"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-xl">Sign Up</h1>
      <label className="block text-left">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="First Name"
        value={data.firstName}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleOnChange}
      />
      <label className="block text-left">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Last Name"
        value={data.lastName}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleOnChange}
      />
      <label className="block text-left">Address</label>
      <input
        type="text"
        placeholder="Address"
        id="address"
        name="address"
        value={data.address}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleOnChange}
      />
      <label className="block text-left">Contact Number</label>
      <input
        type="text"
        id="contactNumber"
        name="contactNumber"
        placeholder="Contact Number"
        value={data.contactNumber}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleOnChange}
      />
      <label className="block text-left">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="abc@gmail.com"
        value={data.email}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleOnChange}
        autoComplete="username"
      />
      <label className="block text-left">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          name="password"
          value={data.password}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleOnChange}
          autoComplete="new-password"
        />
        <div
          className="absolute right-2 top-2.5 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
      <label className="block text-left">Confirm Password</label>
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={data.confirmPassword}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleOnChange}
          autoComplete="new-password"
        />
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
