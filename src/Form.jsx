import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Form = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !address ||
      !contactNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    const userData = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      contactNumber: contactNumber,
      email: email,
      password: password,
    };

    console.log(userData);
    const URL = `https://6y2en536ea.execute-api.us-east-1.amazonaws.com/dev/register`;
    try {
      const response = await axios.post(URL, userData);
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message); 
      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        console.log("message", error.response.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
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
        placeholder="First Name"
        value={firstName}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <label className="block text-left">Last Name</label>
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <label className="block text-left">Address</label>
      <input
        type="text"
        placeholder="Address"
        value={address}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <label className="block text-left">Contact Number</label>
      <input
        type="text"
        placeholder="Contact Number"
        value={contactNumber}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setContactNumber(e.target.value);
        }}
      />
      <label className="block text-left">Email</label>
      <input
        type="email"
        placeholder="abc@gmail.com"
        value={email}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label className="block text-left">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
          value={confirmPassword}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
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

export default Form;
