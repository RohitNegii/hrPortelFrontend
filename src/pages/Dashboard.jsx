import React from "react";
import CustomTable from "../components/global/Table.jsx";
import Layout from "../layout/Layout.jsx";

const columns = [
  { title: "Profile", dataField: "image", type: "image" },
  { title: "Employee Name", dataField: "name", type: "text" },
  { title: "Position", dataField: "position", type: "text" },
  { title: "Department", dataField: "department", type: "text" },
  { title: "Task", dataField: "task", type: "text" },
  { title: "Status", dataField: "status", type: "status" },
  { title: "Action", dataField: "actions", type: "actions" },
];

const data = [
  {
    image: "https://i.pravatar.cc/40?img=1",
    name: "Jane Copper",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Home page Alignment",
    status: "Present",
  },
  {
    image: "https://i.pravatar.cc/40?img=2",
    name: "Arlene McCoy",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Login page design, Dashboard Home page design",
    status: "Absent",
  },
  {
    image: "https://i.pravatar.cc/40?img=3",
    name: "Cody Fisher",
    position: "Senior",
    department: "Backend Development",
    task: "--",
    status: "Absent",
  },
  {
    image: "https://i.pravatar.cc/40?img=4",
    name: "Janney Wilson",
    position: "Junior",
    department: "Backend Development",
    task: "Dashboard login page integration",
    status: "Present",
  },
  {
    image: "https://i.pravatar.cc/40?img=5",
    name: "Leslie Alexander",
    position: "Team Lead",
    department: "Human Resource",
    task: "4 scheduled interview, Sorting of resumes",
    status: "Present",
  },
];

const handleAction = (row) => {
  alert(`Action clicked for ${row.name}`);
};

function App() {
  return (
    <>
      <Layout>
        <CustomTable columns={columns} data={data} onAction={handleAction} />;
      </Layout>
    </>
  );
}

export default App;
