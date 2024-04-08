import { AuthPaths, DoctorPaths, PatientPaths } from "../routes/paths";
import { logOut } from "../utils/auth";
import { Roles } from "./roles";
import CampaignIcon from "@mui/icons-material/Campaign";
import {
  CalendarMonth,
  Dashboard,
  History,
  Message,
  Notifications,
  Subject,
} from "@mui/icons-material";

export const PATIENT_NAV_ITEMS = [
  {
    name: "Dashboard",
    url: PatientPaths.PATIENT_DASHBOARD,
    icon: <Dashboard />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "Appointments",
    url: PatientPaths.PATIENT_APPOINTMENT,
    icon: <CalendarMonth />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "History",
    url: PatientPaths.PATIENT_HISTORY,
    icon: <History />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "Announcements",
    url: PatientPaths.PATIENT_ANNOUNCEMENTS,
    icon: <CampaignIcon />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "Messages",
    url: PatientPaths.PATIENT_MESSAGES,
    icon: <Message />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "Notifications",
    url: PatientPaths.PATIENT_NOTIFICATIONS,
    icon: <Notifications />,
    role: Roles.PATIENT,
    bottom: true,
  },
  // {
  //   name: "Faq",
  //   url: PatientPaths.PATIENT_FAQ,
  //   icon: <Help />,
  //   role: Roles.PATIENT,
  //   bottom: true,
  // },
];
export const DOCTOR_NAV_ITEMS = [
  {
    name: "Dashboard",
    url: DoctorPaths.DOCTOR_DASHBOARD,
    icon: <Dashboard />,
    role: Roles.DOCTOR,
    bottom: false,
  },
  {
    name: "Appointments",
    url: DoctorPaths.DOCTOR_APPOINTMENT,
    icon: <CalendarMonth />,
    role: Roles.DOCTOR,
    bottom: false,
  },
  {
    name: "Waitlist",
    url: DoctorPaths.DOCTOR_WAITLIST,
    icon: <Subject />,
    role: Roles.DOCTOR,
    bottom: false,
  },
  {
    name: "History",
    url: DoctorPaths.DOCTOR_HISTORY,
    icon: <History />,
    role: Roles.DOCTOR,
    bottom: false,
  },
  {
    name: "Announcements",
    url: DoctorPaths.DOCTOR_ANNOUNCEMENTS,
    icon: <CampaignIcon />,
    role: Roles.DOCTOR,
    bottom: false,
  },
  {
    name: "Messages",
    url: DoctorPaths.DOCTOR_MESSAGES,
    icon: <Message />,
    role: Roles.DOCTOR,
    bottom: false,
  },
  {
    name: "Notifications",
    url: DoctorPaths.DOCTOR_NOTIFICATIONS,
    icon: <Notifications />,

    role: Roles.DOCTOR,
    bottom: true,
  },
  // {
  //   name: "Faq",
  //   url: DoctorPaths.DOCTOR_FAQ,
  //   icon: <Help />,
  //   role: Roles.DOCTOR,
  //   bottom: true,
  // },
];
export const LOGOUT_NAV = {
  name: "Logout",
  url: "",
  // icon: (superPatient) => (superPatient ? <LogoutOff /> : <LogoutOn />),
  onClick: (navigate) =>
    logOut(() => navigate(AuthPaths.SIGNIN, { replace: true })),
};
