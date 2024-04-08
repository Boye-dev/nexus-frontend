import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/pages/Dashboard";
import Appointments from "./pages/Appointments";
import Announcements from "./pages/Announcements";
import Messages from "./pages/Messages";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";
import Waitlist from "./pages/Waitlist";
import History from "./pages/History";

function DoctorRouter() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="dashboard" replace />} />
      <Route exact path="dashboard" element={<Dashboard />} />
      <Route exact path="appointments" element={<Appointments />} />
      <Route exact path="announcements" element={<Announcements />} />
      <Route exact path="notifications" element={<Notification />} />
      <Route exact path="messages" element={<Messages />} />
      <Route exact path="settings" element={<Settings />} />
      <Route exact path="waitlist" element={<Waitlist />} />
      <Route exact path="history" element={<History />} />
    </Routes>
  );
}

export default DoctorRouter;
