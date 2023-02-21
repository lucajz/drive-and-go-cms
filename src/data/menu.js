import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";

const menu = [
  {
    title: "Dashboard",
    icon: <DashboardIcon sx={{ fontSize: 35 }} />,
    path: "/",
  },
  {
    title: "Add Car",
    icon: <AddIcon sx={{ fontSize: 35 }} />,
    path: "/add-car",
  },
];

export default menu;
