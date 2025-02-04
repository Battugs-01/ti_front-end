import { useState } from "react";

export const IClock = () => {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <div className="flex justify-end bg-white px-2 rounded-lg shadow-md">
      <p className="font-semibold text-gray-700">{ctime}</p>
    </div>
  );
};
