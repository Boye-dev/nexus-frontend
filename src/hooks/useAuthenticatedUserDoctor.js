import { useQuery } from "react-query";
import { useAlert } from "../context/NotificationProvider";
import { getDecodedJwt, isAuthenticated } from "../utils/auth";
import { fetchUserDoctor } from "../services/authService";

export const useAuthenticatedUserDoctor = () => {
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();

  const doctorId = decodedUser.id;

  const { isLoading, data } = useQuery(
    ["doctor_by_id", { doctorId }],
    fetchUserDoctor,
    {
      enabled: isAuthenticated() && doctorId !== null && doctorId !== undefined,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );

  return { isLoading, userDetails: data };
};
