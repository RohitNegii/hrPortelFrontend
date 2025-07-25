import React, { useEffect, useState } from "react";
import styles from "./Candidate.module.css";

import CandidateForm from "./CandidateForm";
import {
  getCandidates,
  downloadResume,
  selectCandidate,
} from "../../services/candidateApi";

import CustomTable from "../global/Table";
import { toast } from "react-toastify";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getCandidates({ search, position, status });
      const formatted = res.data.map((c, i) => ({
        srNo: i + 1,
        name: c.name,
        email: c.email,
        phone: c.phone,
        position: c.position,
        status: c.status,
        experience: c.experience,
        actions: {
          download: {
            label: "Download",
            onClick: () => {
              try {
                downloadResume(c.resumeUrl);
                toast.success("Resume download started");
              } catch (err) {
                toast.error("Failed to download resume");
              }
            },
          },
          ...(c.status !== "selected" && {
            select: {
              label: "Select",
              onClick: async () => {
                try {
                  await selectCandidate(c._id);
                  toast.success("Candidate selected successfully");
                  fetchData();
                } catch (err) {
                  toast.error(
                    err?.response?.data?.message || "Failed to select candidate"
                  );
                }
              },
            },
          }),
        },
      }));
      setCandidates(formatted);
    } catch (err) {
      toast.error("Failed to load candidates");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, position, status]);

  const columns = [
    { title: "Sr No.", dataField: "srNo" },
    { title: "Candidate Name", dataField: "name" },
    { title: "Email Address", dataField: "email" },
    { title: "Phone Number", dataField: "phone" },
    { title: "Position", dataField: "position" },
    { title: "Status", dataField: "status" },
    { title: "Experience", dataField: "experience" },
    { title: "Action", dataField: "actions", type: "actions" },
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.filters}>
        <div className={styles.filters}>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="selected">Selected</option>
          </select>

          <select onChange={(e) => setPosition(e.target.value)}>
            <option value="">Position</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
          </select>
        </div>

        <div className={styles.filters}>
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={() => setOpen(true)}>Add Candidate</button>
        </div>
      </div>

      {open && (
        <CandidateForm onClose={() => setOpen(false)} refersh={fetchData} />
      )}

      <CustomTable columns={columns} data={candidates} />
    </div>
  );
};

export default CandidateTable;
