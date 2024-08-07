import { Link } from "react-router-dom";
import { menuItems } from "./menu_items";

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderWidth: "0 12px 12px 12px",
  borderColor: "transparent transparent #E7EDEE transparent",
  position: "absolute",
  top: "145%",
  left: "55%",
  transform: "translateX(-50%)",
};
export const Menu: React.FC = () => {
  return (
    <div className="flex items-center">
      {menuItems.map((item, index) => (
        <div key={index} className="flex items-center relative p-6">
          <Link
            to={item.path}
            className="flex items-center gap-2 text-primary-300 no-underline"
          >
            {item.icon}
            <div>{item.name}</div>
          </Link>
          <div style={triangleStyle}></div>
        </div>
      ))}
    </div>
  );
};
