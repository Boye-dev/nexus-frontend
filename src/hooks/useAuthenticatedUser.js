import { useQuery } from "react-query";
import { useAlert } from "../context/NotificationProvider";
import { getDecodedJwt, isAuthenticated } from "../utils/auth";
import { fetchUser } from "../services/authService";

export const useAuthenticatedUser = () => {
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();

  const patientId = decodedUser.id;

  const { isLoading, data } = useQuery(
    ["patient_by_id", { patientId }],
    fetchUser,
    {
      enabled:
        isAuthenticated() && patientId !== null && patientId !== undefined,
      onError: (error) => {
        showNotification?.(error.response?.data?.message || error.message, {
          type: "error",
        });
      },
    }
  );

  return { isLoading, userDetails: data };
};
