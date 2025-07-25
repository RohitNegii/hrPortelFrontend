import React, { useState } from "react";
import styles from "./Table.module.css";
import { FaEllipsisV } from "react-icons/fa";

const CustomTable = ({ columns, data }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const value = row[col.dataField];

                switch (col.type) {
                  case "image":
                    return (
                      <td key={colIndex}>
                        <img
                          src={value}
                          alt="profile"
                          className={styles.profileImage}
                        />
                      </td>
                    );

                  case "status":
                    return (
                      <td key={colIndex}>
                        <span
                          className={`${styles.status} ${
                            value === "Present" ? styles.present : styles.absent
                          }`}
                        >
                          {value}
                        </span>
                      </td>
                    );

                  case "actions":
                    return (
                      <td key={colIndex} className={styles.relative}>
                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(rowIndex);
                          }}
                        >
                          <FaEllipsisV />
                        </button>

                        {openDropdownIndex === rowIndex && (
                          <div className={styles.dropdown}>
                            {Object.entries(value).map(
                              ([key, { label, onClick }]) => (
                                <div
                                  key={key}
                                  className={styles.dropdownItem}
                                  onClick={() => {
                                    onClick(row);
                                    setOpenDropdownIndex(null);
                                  }}
                                >
                                  {label}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </td>
                    );

                  default:
                    return <td key={colIndex}>{value}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
