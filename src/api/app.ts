import axios from "axios";
export const employeeList = async () => {
  const res = await axios.get("https://dummyjson.com/users");
  return res.data;
};
