import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import {
  FaUserTie,
  FaUsers,
  FaCalendarCheck,
  FaChartBar,
  FaSignOutAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import useSidebarStore from "../store/sidebarStore";
import { useAuthStore } from "../store/authStore";

const sections = [
  {
    heading: "Recruitment",
    items: [{ label: "Candidates", icon: <FaUserTie />, path: "/candidates" }],
  },
  {
    heading: "Organization",
    items: [
      { label: "Employees", icon: <FaUsers />, path: "/employees" },
      { label: "Attendance", icon: <FaChartBar />, path: "/attendance" },
      { label: "Leaves", icon: <FaCalendarCheck />, path: "/leaves" },
    ],
  },
  {
    heading: "Others",
    items: [{ label: "Logout", icon: <FaSignOutAlt />, path: "/logout" }],
  },
];

const Sidebar = () => {
  const { activeTab, setActiveTab, isOpen, toggleSidebar } = useSidebarStore();
  const {logout}=useAuthStore()

  return (
    <>
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.logo}>LOGO</div>

        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search" />
        </div>

        {sections.map((section, i) => (
          <div className={styles.section} key={i}>
            <p
              className={styles.heading}
            >
              {section.heading}
            </p>
            {section.items.map((item, idx) => {
              const isLogout = item.label.toLowerCase() === "logout";

              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  onClick={(e) => {
                    if (isLogout) {
                      e.preventDefault(); // prevent default route change
                      logout(); // call logout
                    } else {
                      setActiveTab(item.label);
                      if (window.innerWidth <= 768) toggleSidebar();
                    }
                  }}
                >
                  {item.icon} <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </aside>

      {/* Hamburger Toggle */}
      <button className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </>
  );
};

export default Sidebar;
