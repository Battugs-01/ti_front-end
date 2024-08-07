import { Link, NavLink } from "react-router-dom";
import { menuItems } from "./menu_items";

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderWidth: "0 12px 12px 12px",
  borderColor: "transparent transparent #E7EDEE transparent",
  position: "absolute",
  top: "85%",
  left: "55%",
  transform: "translateX(-50%)",
};
export const Menu: React.FC = () => {
  return (
    <div className="flex items-center">
      {menuItems.map((item, index) => (
        <div key={index} className="flex items-center relative p-6">
          <NavLink
            to={item.path}
            className={({ isActive }) => {
              return `flex items-center gap-2 text-primary-300 no-underline
            ${isActive && "text-primary-600"}      
            `;
            }}
          >
            {({ isActive }) => (
              <>
                {item.icon}
                <div>{item.name}</div>
                {isActive && <div style={triangleStyle}></div>}
              </>
            )}
          </NavLink>
        </div>
      ))}
    </div>
  );
};
