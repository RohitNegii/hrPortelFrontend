import React, { useEffect, useState } from "react";
import {
  getLeaves,
  addLeave,
  updateLeaveStatus,
  getApprovedLeaves,
} from "../../services/leaveService";
import styles from "./LeaveManagement.module.css";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CustomTable from "../global/Table";
import AddLeaveModal from "./AddLeaves.jsx";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [approved, setApproved] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getLeaves(search, status);
      const formatted = res.map((leave) => ({
        profile:
          leave.employeeId.profile ||
          "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
        name: leave.employeeId.name,
        date: new Date(leave.date).toLocaleDateString("en-US"),
        reason: leave.reason,
        status: leave.status,
        doc: leave.docUrl
          ? {
              label: "📄",
              onClick: () => window.open(leave.docUrl, "_blank"),
            }
          : { label: "--", onClick: () => {} },
        actions: {
          pending: {
            label: "Pending",
            onClick: () => handleStatusChange(leave._id, "Pending"),
          },
          approved: {
            label: "Approved",
            onClick: () => handleStatusChange(leave._id, "Approved"),
          },
          rejected: {
            label: "Rejected",
            onClick: () => handleStatusChange(leave._id, "Rejected"),
          },
        },
      }));
      setLeaves(formatted);

      const approvedLeaves = await getApprovedLeaves();
      setApproved(approvedLeaves);
    } catch (err) {
      toast.error("Error loading leave data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, status]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLeaveStatus(id, newStatus);
      toast.success("Leave status updated");
      fetchData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const columns = [
    { title: "Profile", dataField: "profile", type: "image" },
    { title: "Name", dataField: "name" },
    { title: "Date", dataField: "date" },
    { title: "Reason", dataField: "reason" },
    { title: "Status", dataField: "status", type: "status" },
    { title: "Docs", dataField: "doc", type: "doc" },
    { title: "Action", dataField: "actions", type: "actions" },
  ];

  return (
    <>
      <div className={styles.filters}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={styles.addButton}
            onClick={() => setOpenModal(true)}
          >
            Add Leave
          </button>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.leftSection}>
          <CustomTable columns={columns} data={leaves} />
        </div>

        <div className={styles.rightSection}>
          <h4 className={styles.leaveHeading}>Leave Calendar</h4>
          <div className={styles.calender}>

          <Calendar
            value={selectedDate}
            tileClassName={({ date }) => {
              const matched = approved.find(
                (l) => new Date(l.date).toDateString() === date.toDateString()
              );
              return matched ? styles.highlight : null;
            }}
          />
          </div>
          <div className={styles.approvedList}>
            <h5 className={styles.approvedHeading}>Approved Leaves</h5>
            {approved.map((leave) => (
              <div key={leave._id} className={styles.approvedItem}>
                <img
                  src={
                    leave.employeeId.profile ||
                    "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                  }
                  alt="avatar"
                  className={styles.profileSmall}
                />
                <div>
                  <div>{leave.employeeId.name}</div>
                  <div>{new Date(leave.date).toLocaleDateString("en-US")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {openModal && (
          <AddLeaveModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onLeaveAdded={fetchData}
          />
        )}
      </div>
    </>
  );
};

export default LeaveManagement;
