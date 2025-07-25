import React from "react";
import styles from "./Header.module.css";
import useSidebarStore from "../store/sidebarStore";
import { FaBell, FaEnvelope, FaChevronDown } from "react-icons/fa";

const Header = () => {
  const { activeTab } = useSidebarStore();

  return (
    <header className={styles.header}>
      <h2 className={styles.pageTitle}>{activeTab}</h2>

      <div className={styles.rightIcons}>
        <FaEnvelope className={styles.icon} />
        <FaBell className={styles.icon} />
        <div className={styles.profile}>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className={styles.avatar}
          />
          <FaChevronDown className={styles.chevron} />
        </div>
      </div>
    </header>
  );
};

export default Header;
