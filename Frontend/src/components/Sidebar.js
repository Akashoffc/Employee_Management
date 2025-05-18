import React from "react";

const Sidebar = ({ active, setActive }) => {
  const menus = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Employee", icon: "👥" },
    { name: "Calendar", icon: "📅" },
    { name: "Message", icon: "💬" },
  ];

  return (
    <div className="w-60 h-screen bg-gray-800 text-white flex flex-col">
      <div className="text-3xl font-bold p-6 border-b border-gray-700">AK-Tech</div>
      <nav className="flex flex-col mt-6">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => setActive(menu.name)}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-700 focus:bg-gray-700 text-left ${
              active === menu.name ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            <span>{menu.icon}</span>
            <span>{menu.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
