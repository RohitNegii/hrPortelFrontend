import React from "react";
import Sidebar from "./SideBar.jsx";
import Header from "./Header.jsx";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
