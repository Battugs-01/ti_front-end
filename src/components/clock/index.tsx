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
    <div className="flex justify-end pr-7">
      <h3 className="font-semibold text-gray-700">{ctime}</h3>
    </div>
  );
};
