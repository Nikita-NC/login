import { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { IoIosHappy } from "react-icons/io";
import { FaRegSadCry } from "react-icons/fa";

const Counter = () => {
  const [count, setCounter] = useState(0);
  const [emoji, setEmoji] = useState();
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility

  const increaseCount = () => {
    setCounter(count + 1);
    setEmoji(<IoIosHappy size={30} />);
    setShowPopup(true); // Show pop-up
    setTimeout(() => setShowPopup(false), 2000); // Hide pop-up after 2 seconds
  };

  const decreaseCount = () => {
    setCounter(count - 1);
    setEmoji(<FaRegSadCry size={30}/>);
  };

  return (
    <div className="bg-slate-200 p-4 text-center">
      <div className="flex justify-center">{emoji}</div>
      <div className="flex justify-center items-center mt-2">
        <FaCirclePlus className="text-red-200 cursor-pointer" size={30} onClick={increaseCount} />
        <p className="mx-4">Value: {count}</p>
        <FaCircleMinus className="text-blue-200 cursor-pointer" size={30} onClick={decreaseCount} />
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>You are happy!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counter;
